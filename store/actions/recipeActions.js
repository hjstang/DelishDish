export const createRecipe = (recipe) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        firestore.collection('recipes').add({
            ...recipe,
            authorFirstName: 'Net',
            authorLastName: 'Hansen',
            authorId: 12345,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_RECIPE', recipe})
        }).catch((err) => {
            dispatch({ type: 'CREATE_RECIPE_ERROR', err})
        })
    }
}