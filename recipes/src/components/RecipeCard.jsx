export default function RecipeCard({ recipe }) {
  return (
    <article className="card">
      <div className="card-content">
        <h2 className="title is-5">{recipe.name}</h2>

        <p className="has-text-weight-semibold">Ingrédients</p>
        <ul>
          {recipe.ingredients?.map((ingredient, index) => (
            <li key={`${ingredient}-${index}`}>{ingredient}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}