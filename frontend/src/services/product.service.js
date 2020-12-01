import { auth, firestore } from "../components/firebase";

/*
 * Creates product document within Firestore
 * @farm: farm data entered by user
 * @product: product data entered by user
 * return: Promise
 */
export async function createProduct(farm, product) {
    const productRef = firestore.collection(`farms/${farm.id}/products`);

    var address2 = farm.address2 != "" ? farm.address2 + ", " : "";

    var address = farm.address1 + ", " + address2 +
                    farm.city + ", " + farm.state + ", " +
                    farm.zip;

    const data = {
        name: product.name,
        picture: "https://imagizer.imageshack.com/v2/607x607q90/923/CBcDao.png",
        quantity: product.quantity,
        description: product.description,
        price: product.price,
        expirationDate: product.expirationDate,
        updateDate: product.updateDate,
        categories: product.categories,
        tags: product.tags,
        address: address
    }

    const productDoc = await productRef.add(data);

    const newProductRef = firestore.doc(`farms/${farm.id}/products/${productDoc.id}`);
    newProductRef.set({id: productDoc.id}, {merge: true});

    return productDoc;
}

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


/*
 * Get product document from Firestore
 * @farmid: id of farm document
 * @id: id of product document
 * return: Promise
 */
export async function getProductByID(farmid, id) {
    const productRef = firestore.doc(`farms/${farmid}/products/${id}`);

    return productRef.get()
        .then(docSnap => {
            return docSnap.data();
        })
        .catch(error => {
            return error;
        });
}

/*
 * Get products document by Farm ID from Firestore
 * @farmid: id of farm document
 * return: Promise
 */
export async function getProductsByFarm(farmid) {
    const productRef = firestore.collection(`farms/${farmid}/products`);

    return productRef.get()
        .then(querySnapshot => {
            return querySnapshot.docs;
        })
        .catch(error => {
            return error;
        });
}

/*
 * Updates product document within Firestore
 * @farmid: farm id
 * @product: product data entered by user
 * return: Promise
 */
export async function updateProduct(farmid, product) {
    const productRef = firestore.doc(`farms/${farmid}/products/${product.id}`);

    const data = {
        name: product.name,
        quantity: product.quantity,
        description: product.description,
        price: product.price,
        expirationDate: product.expirationDate,
        updateDate: product.updateDate,
        categories: product.categories,
        tags: product.tags
    }

    return productRef.set(data, {merge: true});
}

/*
 * Deletes product document within Firestore
 * @farmid: farm id
 * @product: product data entered by user
 * return: Promise
 */
export async function deleteProduct(farmid, product) {
    const productRef = firestore.doc(`farms/${farmid}/products/${product.id}`);

    return productRef.delete();
}

export async function sendToCart(productId, name, quantity, price) {
    const cartRef = firestore.doc(`carts/${auth.currentUser.uid}/items/${productId}`);
    var item = {
        name: name,
        price: price,
        quantity: quantity,
        id: productId
    };

    return cartRef.set(item, {merge: true});
}