import { firestore } from "../components/firebase";

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