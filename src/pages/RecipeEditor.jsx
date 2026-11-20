import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById, createRecipe } from "../api/recipeService";
import ListFields from "../components/ListFields";

export default function RecipeEditor() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return;
    }
    getRecipeById(id)
      .then((recipe) => {
        setName(recipe.name);
        setIngredients(recipe.ingredients || []);
        setSteps(recipe.steps || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  function updateList(setList, list, index, value) {
    setList(list.map((item, i) => (i === index ? value : item)));
  }

  function addItem(setList, list) {
    setList([...list, ""]);
  }

  function removeItem(setList, list, index) {
    setList(list.filter((_, i) => i !== index));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError("");

    const recipe = {
      name: name.trim(),
      ingredients: ingredients.map((item) => item.trim()).filter(Boolean),
      steps: steps.map((item) => item.trim()).filter(Boolean),
    };

    try {
      await createRecipe(recipe);
      setMessage("Recette créée avec succès !");
      setName("");
      setIngredients([""]);
      setSteps([""]);
    } catch (err) {
      setError(err.message || "La création de la recette a échoué.");
    }
  }

  return (
    <section className="section">
      {id && loading && <p>Chargement des recettes…</p>}
      {!loading && (
        <div className="container">
          <h1 className="title">Modifier la recette</h1>

          {message && <div className="notification is-success">{message}</div>}
          {error && <div className="notification is-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label" htmlFor="name">Nom</label>
              <div className="control">
                <input
                  id="name"
                  className="input"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>
            </div>

            <ListFields
              title="Ingrédients"
              items={ingredients}
              onChange={(index, value) =>
                updateList(setIngredients, ingredients, index, value)
              }
              onAdd={() => addItem(setIngredients, ingredients)}
              onRemove={(index) => removeItem(setIngredients, ingredients, index)}
            />

            <ListFields
              title="Étapes"
              items={steps}
              onChange={(index, value) =>
                updateList(setSteps, steps, index, value)
              }
              onAdd={() => addItem(setSteps, steps)}
              onRemove={(index) => removeItem(setSteps, steps, index)}
            />

            <button className="button is-primary" type="submit">
              {id ? "Modifier la recette" : "Créer la recette"}
            </button>
          </form>
        </div>
      )}
    </section>
  );
}