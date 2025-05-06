// src/SavedRecipe/SavedRecipe.js

import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, doc, getDocs } from "firebase/firestore";
import ReactMarkdown from "react-markdown";
import "./SavedRecipe.css";

export default function SavedRecipe() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      const user = auth.currentUser;

      if (!user) {
        alert("Please log in to view saved recipes.");
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const savedRecipesRef = collection(userRef, "savedRecipes");
        const snapshot = await getDocs(savedRecipesRef);

        const recipes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSavedRecipes(recipes);
      } catch (error) {
        console.error("Error fetching saved recipes:", error);
        alert("Failed to load saved recipes.");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedRecipes();
  }, []);

  if (loading) {
    return <div className="saved-recipes-loading">Loading recipes...</div>;
  }

  return (
    <div className="saved-recipes-container">
      <h2>Saved Recipes</h2>
      {savedRecipes.length === 0 ? (
        <p>No recipes saved yet.</p>
      ) : (
        savedRecipes.map((recipe) => (
          <div key={recipe.id} className="saved-recipe-card">
            <ReactMarkdown>{recipe.recipe}</ReactMarkdown>
          </div>
        ))
      )}
    </div>
  );
}
