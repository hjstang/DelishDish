import { firestore } from './firebase';

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