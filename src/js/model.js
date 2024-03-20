export const state = {
  recipe: {},
};

export const loadRecipe = async function (recipeId) {
  try {
    // 1) Loading the recipe
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`
    );
    const data = await res.json();

    if (!res.ok) {
      throw new Error(`${data.message} (${res.status})`);
    }

    const {
      id,
      title,
      publisher,
      source_url,
      image_url,
      servings,
      cooking_time,
      ingredients,
    } = data.data.recipe;

    state.recipe = {
      id,
      title,
      publisher,
      sourceUrl: source_url,
      image: image_url,
      servings,
      cookingTime: cooking_time,
      ingredients,
    };
  } catch (error) {
    alert(error);
  }
};
