import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

// For polyfilling async/await
import "regenerator-runtime/runtime";
// For polyfilling everything else
import "core-js/stable";

const recipeContainer = document.querySelector(".recipe");

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const recipeId = window.location.hash.slice(1);
    if (!recipeId) return;

    recipeView.renderSpinner(recipeContainer);

    // 1) Loading recipe
    await model.loadRecipe(recipeId);

    // 2) Rendering the recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    alert(error);
  }
};

window.addEventListener("hashchange", controlRecipes);
window.addEventListener("load", controlRecipes);
