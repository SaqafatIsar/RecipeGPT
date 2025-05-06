import './Main.css'
import ClaudeRecipe from '../ClaudeRecipe/ClaudeRecipe'
import IngredientsList from '../IngredientsList/IngredientsList'
import React from 'react'


import { getRecipeFromOpenRouter } from "../ai";
import Header from '../Header/Header';



export default function Main() {
    const [ingredients, setIngredients] = React.useState([]);
    
    const [recipe, setRecipe]=React.useState("")

    async function getRecipe() {
       // inside your getRecipe function
const recipeMarkdown = await getRecipeFromOpenRouter(ingredients);
        setRecipe(recipeMarkdown)
    }


    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    return (
        <main>
            <Header/>
          
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 &&
                <IngredientsList
                    ingredients={ingredients}
                   getRecipe={getRecipe}
                />
            }

            {recipe && <ClaudeRecipe recipe={recipe}/>}
        </main>
    )
}