import { firestore } from './firebaseConfig';

export async function getUser(){
    try {
        const data = [];
        await firestore.collection('users').get().then((querySnapshot) => {
            querySnapshot.forEach(function (doc) {
                if (doc.exists) {
                    data.push({id: doc.id, name: doc.data().name, surname: doc.data().surname, email: doc.data().email})
                }
            })
        });
        console.log(data);
    } catch ({message}) {
        console.log(message);
    }
    return "hello";
}

export async function getRecipe(id){
    try {
        const recipe = [];
        await firestore.collection('recipes').doc(id).get().then((docSnapshot) => {
            const doc = docSnapshot.data();
            recipe.push({
                id,
                title: doc.title,
                description: doc.description,
                difficulty: doc.difficulty,
                servings: doc.servings,
                sourceUrl: doc.sourceUrl,
                favorited: doc.favorited,
                cuisine: doc.cuisine,
                dishTypes: doc.dishTypes,
                healthTypes: doc.healthTypes,
                ingredients: doc.ingredients,
                imageUrl: doc.imageUrl
            });
        });
        return recipe[0];
    } catch (e) {
        console.log(e)
    }
}