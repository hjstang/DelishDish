const initState = {};

const recipeReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_RECIPE":
      console.log("created recipe", action.recipe);
      return state;
    case "CREATE_RECIPE_ERROR":
      console.log("create recipe error", action.err);
      return state;
    case "DELETE_RECIPE":
      console.log("deleted recipe with id: ", action.recipeId);
      return state;
    case "DELETE_RECIPE_ERROR":
      console.log("delete recipe error", action.err);
      return state;
    case "EDIT_RECIPE":
      console.log("edited recipe with id: ", action.recipeId);
      return state;
    case "EDIT_RECIPE_ERROR":
      console.log("edit recipe error", action.err);
      return state;
    case "SET_FAVORITE":
      console.log("updated favorited-field", action.recipeId);
      return state;
    case "SET_FAVORITE_ERROR":
      console.log("set favorite error", action.err);
      return state;
    default:
      return state;
  }
};

export default recipeReducer;
