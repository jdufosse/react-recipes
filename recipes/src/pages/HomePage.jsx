import { useEffect, useState } from "react";
import { getRecipes } from "../api/recipeService";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getRecipes()
      .then(setRecipes)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <div className="mb-5">
        <h1 className="title">Mes recettes</h1>
        <p className="subtitle">Retrouve toutes tes recettes préférées.</p>
      </div>

      {loading && <p>Chargement des recettes…</p>}

      {error && (
        <div className="notification is-danger is-light">{error}</div>
      )}

      {!loading && !error && recipes.length === 0 && (
        <div className="notification is-info is-light">
          Aucune recette pour le moment.
        </div>
      )}

      {!loading && !error && recipes.length > 0 && (
        <div className="columns is-multiline">
          {recipes.map((recipe) => (
            <div className="column is-12-mobile is-6-tablet is-4-desktop" key={recipe._id}>
              <article className="card">
                <div className="card-content">
                  <h2 className="title is-5">{recipe.name}</h2>

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
                        {index + 1}. {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </article>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}