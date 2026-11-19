import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getRecipeById } from "../api/recipeService";

export default function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getRecipeById(id)
      .then(setRecipe)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div key={recipe._id}>
      {loading && <p>Chargement des recettes…</p>}

      {error && (
        <div className="notification is-danger is-light">{error}</div>
      )}

      {!loading && !error && recipe && (
        <div>
          <h1 className="title is-1">{recipe.name}</h1>

          <p className="title is-3 mb-2">
            Ingrédients
          </p>
          <ul>
            {recipe.ingredients?.map((ingredient, index) => (
              <li key={`${ingredient}-${index}`}>• {ingredient}</li>
            ))}
          </ul>

          <p className="title is-3 mt-4 mb-2">
            Préparation
          </p>
          <ol>
            {recipe.steps?.map((step, index) => (
              <li key={`${step}-${index}`}>
                {step}
              </li>
            ))}
          </ol>

          <Link to={`/recipe/edit/${recipe._id}`} className="is-block">
            <button className="button is-primary" type="submit">
              Modifier la recette
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}