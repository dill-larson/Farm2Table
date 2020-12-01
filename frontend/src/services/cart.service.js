import { firestore } from "../components/firebase";

/*
 * Helper function: Creates user cart, so products can be added
 * @user: Firebase Auth user
 * return: Promise
 */
export async function createUserCart(user) {
    const cartRef = firestore.doc(`carts/${user.uid}`);

    const data = {
        id: user.uid,
        quantity: 0
    }

    cartRef.set(data);
}

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