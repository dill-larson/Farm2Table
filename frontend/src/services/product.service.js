import { auth, firestore } from "../components/firebase";

export async function getProducts() {
    const productRef = firestore.collectionGroup("products");

    return productRef.get()
        .then(querySnapshot => {
            return querySnapshot.docs;
        })
        .catch(error => {
            return error;
        });
}

export async function sendToCart(productId, name, quantity, farm,price) {
    const cartRef = firestore.doc(`carts/${auth.currentUser.uid}/items/${productId}`);
    var item = {
        Iname: name,
        Ifarm: farm,
        Iprice: price,
        Iquantity: quantity,
        IproductID: productId
    };

    return cartRef.set(item, {merge: true});
}