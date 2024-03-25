import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";

// For polyfilling async/await
import "regenerator-runtime/runtime";
// For polyfilling everything else
import "core-js/stable";

if (module.hot) {
  module.hot.accept;
}

const controlRecipes = async function () {
  try {
    const recipeId = window.location.hash.slice(1);
    if (!recipeId) return;

    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(recipeId);

    // 2) Rendering the recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.log(error);
    recipeView.renderError(
      "We could not find the recipe. Please try another one!"
    );
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1) Get search query
    const query = searchView.getQuery();

    if (!query) return;

    // 2) Load query results
    await model.loadSearchResults(query);

    // 3) Render query results
    resultsView.render(model.getSearchResultsPage(1));

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
    // searchView.renderError(error);
  }
};

const controlPagination = function (btn) {
  btn.classList.contains("pagination__btn--next")
    ? (model.state.search.page += 1)
    : (model.state.search.page -= 1);

  // 3) Render query results
  resultsView.render(model.getSearchResultsPage(model.state.search.page));
  // 4) Render initial pagination buttons
  paginationView.render(model.state.search);
};

const init = function () {
  recipeView.addRenderHandler(controlRecipes);
  searchView.addSearchHandler(controlSearchResults);
  paginationView.addClickHandler(controlPagination);
};

init();
