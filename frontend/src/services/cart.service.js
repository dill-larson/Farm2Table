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

/*
 * Get all items in cart for user
 * @user: Firebase Auth user
 * return Promise
 */
export async function getCartItems(user) {
    const cartRef = firestore.collection(`carts/${user.uid}/items`);

    return cartRef.get()
        .then(querySnapshot => {
            return querySnapshot.docs;
        })
        .catch(error => {
            return error;
        });
}