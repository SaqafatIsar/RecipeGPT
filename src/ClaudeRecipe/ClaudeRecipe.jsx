// import ReactMarkdown from 'react-markdown';

// export default function ClaudeRecipe(props) {
//     return (
//         <section className="recipe">
//             <h2>Recipe:</h2>
//             <ReactMarkdown>{props.recipe}</ReactMarkdown>
//         </section>
//     );
// }
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { db, auth } from '../firebase';
import { doc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './ClaudeRecipe.css'; // Import CSS

export default function ClaudeRecipe(props) {
  const saveRecipe = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please log in to save the recipe.");
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);
      const savedRecipesRef = collection(userRef, "savedRecipes");

      await addDoc(savedRecipesRef, {
        recipe: props.recipe,
        savedAt: serverTimestamp()
      });

      alert("Recipe saved successfully!");
    } catch (error) {
      console.error("Error saving recipe:", error);
      alert("Failed to save the recipe.");
    }
  };

  return (
    <section className="recipe">
      <h2>Recipe:</h2>
      <ReactMarkdown>{props.recipe}</ReactMarkdown>

      <button onClick={saveRecipe} className="save-btn">
        Save Recipe
      </button>
    </section>
  );
}
