export const createRecipe = (recipe, recipeId) => {
  return (dispatch, getState, getFirebase) => {
    // make async call to database
    const firestore = getFirebase().firestore();

    const newRecipeRef = firestore.collection("recipes").doc(recipeId);

    newRecipeRef
      .set({
        ...recipe
      })
      .then(() => {
        dispatch({ type: "CREATE_RECIPE", recipe });
      })
      .catch(err => {
        dispatch({ type: "CREATE_RECIPE_ERROR", err });
      });
  };
};

export const deleteRecipe = recipeId => {
  return (dispatch, getState, getFirebase) => {
    const firestore = getFirebase().firestore();

    firestore
      .collection("recipes")
      .doc(recipeId)
      .delete()
      .then(() => {
        dispatch({ type: "DELETE_RECIPE", recipeId });
      })
      .catch(err => {
        dispatch({ type: "DELETE_RECIPE_ERROR", err });
      });
  };
};

export const editRecipe = (recipeId, recipeChanges) => {
  return (dispatch, getState, getFirebase) => {
    const firestore = getFirebase().firestore();
    const ref = firestore.collection("recipes").doc(recipeId);

    ref
      .update(recipeChanges)
      .then(() => {
        dispatch({ type: "EDIT_RECIPE", recipeId });
      })
      .catch(err => {
        dispatch({ type: "EDIT_RECIPE_ERROR", err });
      });
  };
};

export const setFavoriteRecipe = (recipeId, favorite) => {
  return (dispatch, getState, getFirebase) => {
    const firestore = getFirebase().firestore();
    const ref = firestore.collection("recipes").doc(recipeId);

    ref
      .update({ favorited: favorite })
      .then(() => {
        dispatch({ type: "SET_FAVORITE", recipeId });
      })
      .catch(err => {
        dispatch({ type: "SET_FAVORITE_ERROR", err });
      });
  };
};
