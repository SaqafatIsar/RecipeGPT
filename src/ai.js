// import { HfInference } from '@huggingface/inference'

// const SYSTEM_PROMPT = `
// You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.
// `

// const hf = new HfInference(process.env.REACT_APP_HF_ACCESS_TOKEN);

// export async function getRecipeFromMistral(ingredientsArr) {
//     const ingredientsString = ingredientsArr.join(", ");
//     try {
//         const response = await hf.chatCompletion({
//             model: "tiiuae/falcon-7b-instruct", // or another available free model
//             messages: [
//                 { role: "system", content: SYSTEM_PROMPT },
//                 { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
//             ],
//             max_tokens: 1024,
//         });
//         return response.choices[0].message.content;
//     } catch (err) {
//         console.error("Failed to fetch recipe:", err.message);
//         return "Sorry, there was an issue generating your recipe. Please try again later or check your model access.";
//     }
// }
// src/ai.js
// src/ai.js

const API_URL = "https://openrouter.ai/api/v1/chat/completions";

/**
 * Fetches a recipe suggestion from OpenRouter based on provided ingredients.
 *
 * @param {string[]} ingredientsArr - An array of ingredient names.
 * @returns {Promise<string>} - The AI-generated recipe or an error message.
 */
export async function getRecipeFromOpenRouter(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");
  const OPENROUTER_API_KEY = process.env.REACT_APP_OPENROUTER_API_KEY;

  if (!OPENROUTER_API_KEY) {
    console.error("OpenRouter API key is missing. Please set REACT_APP_OPENROUTER_API_KEY in your .env file.");
    return "Error: Missing API key.";
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "X-Title": "RecipeGPT"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful cooking assistant. The user will provide a list of ingredients. Recommend a recipe using some or all of the ingredients."
          },
          {
            role: "user",
            content: `I have ${ingredientsString}. What can I cook?`
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to fetch recipe:", errorText);
      return `Error: ${errorText}`;
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching recipe:", error.message);
    return "Error generating recipe. Please try again.";
  }
}
