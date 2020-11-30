import { firestore } from "../components/firebase";

export async function getCartProductDocs(uid) {
    const cartsRef = firestore.collection('carts');
    return cartsRef.where('user', '==', uid).limit(1).get().then( (querySnapshot) => {
            if (querySnapshot.empty) {
                console.log('Empty cart.');
                return [];
            }

            return querySnapshot.docs[0].data().items;
        }
    )
    .catch(error => {
        return error;
    });
}