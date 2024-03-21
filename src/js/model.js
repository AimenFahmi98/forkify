import { API_URL } from "./config";
import { getJSON } from "./helpers";

export const state = {
  recipe: {},
};

export const loadRecipe = async function (recipeId) {
  try {
    // 1) Loading the recipe
    const data = await getJSON(`${API_URL}/${recipeId}`);

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
    throw error;
  }
};
