import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRecipes } from "../api/recipeService";
import RecipeCard from "../components/RecipeCard";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getRecipes()
    .then(setRecipes)
      .catch((err) => {
        console.error("Échec du chargement :", err);
        setError(`${err.name}: ${err.message}`);
      })
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
            <div className="column is-12-mobile is-6-tablet is-4-desktop" key={recipe.id}>
              <Link to={`/recipe/${recipe._id}`} className="is-block">
                <RecipeCard recipe={recipe} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}