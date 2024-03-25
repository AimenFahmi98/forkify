import { API_URL, RESULTS_PER_PAGE } from "./config";
import { getJSON } from "./helpers";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    resultsPerPage: RESULTS_PER_PAGE,
    page: 1,
  },
};

export const loadRecipe = async function (recipeId) {
  try {
    // 1) Loading the recipe
    const data = await getJSON(`${API_URL}/${recipeId}`);

    // 2) Reformat field names to 'camelCase' and store recipe in global state
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
    console.log(error);
    throw error;
  }
};

export const loadSearchResults = async function (query) {
  try {
    const data = await getJSON(`${API_URL}/?search=${query}`);

    state.search.query = query;
    state.search.results = data.data.recipes.map((rec) => {
      return {
        id: `#${rec.id}`,
        title: rec.title,
        publisher: rec.publisher,
        sourceUrl: rec.source_url,
        image: rec.image_url,
      };
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  this.state.recipe.ingredients.forEach((ingredient) => {
    if (!ingredient) return;
    ingredient.quantity =
      (ingredient.quantity * newServings) / this.state.recipe.servings;
  });
  this.state.recipe.servings = newServings;
};
