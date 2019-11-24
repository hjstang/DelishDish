export const createRecipe = recipe => {
  return (dispatch, getState, getFirebase) => {
    // make async call to database
    const firestore = getFirebase().firestore();
    const authorId = getState().firebase.auth.uid;

    firestore
      .collection("recipes")
      .add({
        ...recipe,
        authorId,
        createdAt: new Date()
      })
      .then(() => {
        dispatch({ type: "CREATE_RECIPE", recipe });
      })
      .catch(err => {
        dispatch({ type: "CREATE_RECIPE_ERROR", err });
      });
  };
};
