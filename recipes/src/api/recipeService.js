const API_URL = import.meta.env.VITE_API_URL;

export async function getRecipes() {
  const response = await fetch(`${API_URL}/recipe`);

  if (!response.ok) {
    throw new Error("Impossible de récupérer les recettes");
  }

  return response.json();
}

export async function getRecipeById(id) {
  const response = await fetch(
    `${API_URL}/recipe/${encodeURIComponent(id)}`
  );

  if (!response.ok) {
    throw new Error("Impossible de récupérer cette recette");
  }

  return response.json();
}