import { firestore } from "../components/firebase";

/*
 * Creates farm document within Firestore
 * @user: Firebase Auth user object
 * @farm: farm data entered by user
 * return: Promise
 */
export async function createFarm(user, farm) {
    const farmRef = firestore.collection('farms');

    var address2 = farm.address2 != "" ? farm.address2 + ", " : "";

    var address = farm.address1 + ", " + address2 +
                    farm.city + ", " + farm.state + ", " +
                    farm.zip;

    const data = {
        farmer: user.uid,
        name: farm.name,
        description: farm.description,
        address: address
    }

    const farmDoc = await farmRef.add(data);

    const newFarmRef = firestore.doc(`farms/${farmDoc.id}`);
    newFarmRef.set({id: farmDoc.id}, {merge: true});

    return farmDoc;
}

/*
 * Gets all farms owned by user
 * @user: Firebase Auth user
 * returns: Promise<queryDocumentSnapshot[]>
 */ 
export async function getFarmsByFarmer(user) {
    const farmRef = firestore.collection('farms');

    return farmRef.where('farmer', '==', user.uid).get()
        .then(querySnapshot => {
            return querySnapshot.docs;
        })
        .catch(error => {
            return error;
        });
}

/*
 * Gets farm by id
 * @id: id of farm within Firestore
 * returns: Promise
 */ 
export async function getFarmByID(id) {
    const farmRef = firestore.doc(`farms/${id}`);

    return farmRef.get()
        .then(docSnap => {
            return docSnap.data();
        })
        .catch(error => {
            return error;
        });
}

/*
 * Updates farm document within Firestore
 * @farm: farm data entered by user
 * return: Promise
 */
export async function updateFarm(farm) {
    const farmRef = firestore.doc(`farms/${farm.id}`);

    var address2 = farm.address2 != "" ? farm.address2 + ", " : "";

    var address = farm.address1 + ", " + address2 +
                    farm.city + ", " + farm.state + ", " +
                    farm.zip;

    const data = {
        name: farm.name,
        description: farm.description,
        address: address
    }

    return farmRef.set(data, {merge: true}); //merge: doesn't affect any data/information not in data variable above
}

/*
 * Deletes user data within Firestore
 * @user: Firebase Auth user
 * return: Promise
 */ 
export async function deleteFarm(farm) {
    const userRef = firestore.doc(`farms/${farm.id}`);
    return userRef.delete();
}