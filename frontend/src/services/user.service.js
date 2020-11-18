import { auth, firestore } from "../components/firebase";

/*
 * Creates new user account within Firebase Auth and Firestore
 * @user: user data
 * @password: user password
 * return: Promise
 */
export async function createUser(user, password) {
    const credential = await auth.createUserWithEmailAndPassword(user.email, password)
        .catch(error => {
            return error;
        });

    if(credential.user !== undefined) { //Firebase Auth create user successfully
        return createUserData(credential.user, user);
    } else { //Firebase Auth ran into an error
        return new Promise((resolve, rejected) => 
            rejected(credential) //return error message from Firebase Auth
        );
    }
}

/*
 * Helper function: Creates user document within Firestore
 * @user: Firebase Auth user object
 * @userdata: other data entered by user
 * return: Promise
 */
function createUserData(user, userdata) {
    const userRef = firestore.doc(`users/${user.uid}`);

    var address2 = userdata.address2 !== undefined ? userdata.address2 + ", " : "";

    var address = userdata.address1 + ", " + address2 +
                    userdata.city + ", " + userdata.state + ", " +
                    userdata.zip;

    const data = {
        id: user.uid,
        displayName: userdata.displayName,
        email: user.email,
        address: address,
        role: userdata.role
    }

    return userRef.set(data, { merge: true });
}

/*
 * Logs out user
 * return: Promise
 */
export async function signOut() {
    return await auth.signOut();
}