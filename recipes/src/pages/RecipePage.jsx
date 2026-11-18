import { useEffect, useState } from "react";
import { getRecipeById } from "../api/recipeService";

export default function RecipePage() {
  const [recipe, setRecipe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getRecipeById()
      .then(setRecipe)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="column is-12-mobile is-6-tablet is-4-desktop" key={recipe._id}>
      {loading && <p>Chargement des recettes…</p>}

      {error && (
        <div className="notification is-danger is-light">{error}</div>
      )}
      
      <article className="card">
        <div className="card-content">
          <h1 className="title is-5">{recipe.name}</h1>

          <p className="has-text-weight-semibold mb-2">
            Ingrédients
          </p>
          <ul>
            {recipe.ingredients?.map((ingredient, index) => (
              <li key={`${ingredient}-${index}`}>• {ingredient}</li>
            ))}
          </ul>

          <p className="has-text-weight-semibold mt-4 mb-2">
            Préparation
          </p>
          <ol>
            {recipe.steps?.map((step, index) => (
              <li key={`${step}-${index}`}>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </article>
    </div>
  )
}