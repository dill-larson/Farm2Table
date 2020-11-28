import firebase from "firebase/app";
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

    var address2 = userdata.address2 != "" ? userdata.address2 + ", " : "";

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

    return userRef.set(data);
}

/*
 * Logs out user
 * return: Promise
 */
export async function signOut() {
    return await auth.signOut();
}

/*
 * Signs in user; sets firebase.auth.currentUser
 * @email: string
 * @password: string
 * return: Promise
 */ 
export async function signIn(email, password) {
    const credential = await auth.signInWithEmailAndPassword(email, password)
        .catch(error => {
            return error;
        });

    if(credential.user !== undefined) { //Firebase Auth create user successfully
        return new Promise((resolve, rejected) =>
            resolve() //return empty promise on success
        );
    } else { //Firebase Auth ran into an error
        return new Promise((resolve, rejected) => 
            rejected(credential) //return error message from Firebase Auth
        );
    }
}

/*
 * Updates user data within Firestore
 * @user: Firebase Auth user
 * @userdata: data to be updated within user document
 * return: Promise
 */
export async function updateUserData(user, userdata) {
    const userRef = firestore.doc(`users/${user.uid}`);

    var address2 = userdata.address2 != "" ? userdata.address2 + ", " : "";

    var address = userdata.address1 + ", " + address2 +
                    userdata.city + ", " + userdata.state + ", " +
                    userdata.zip;

    const data = {
        displayName: userdata.displayName,
        address: address,
    }

    return userRef.set(data, { merge: true }); //merge: doesn't affect any data/information not in data variable above
}

/*
 * Updates Firebase Auth user email
 * @user: Firebase Auth user
 * @email: new user email
 * return: Promise
 */
export async function updateUserEmail(user, email, password) {
    const reauth = await reauthenticateUser(user, password)
        .catch(error => {
            return error;
        });

    if(!reauth?.code) { //successfully reauthenticated user
        return user.updateEmail(email)
                .then(() => { //update userdata within Firestore
                    const userRef = firestore.doc(`users/${user.uid}`);
                    return userRef.set({email: email}, {merge: true});
                });
    } else { //password did not match Firebase Auth user
        return new Promise((resolve, rejected) => 
            rejected(reauth) //return error message from Firebase Auth
        );
    }  
}

/*
 * Updates Firebase Auth user password
 * @user: Firebase Auth user
 * @password: current user password
 * @new_password: new user password
 * return: Promise
 */
export async function updateUserPassword(user, password, new_password) {
    const reauth = await reauthenticateUser(user, password)
        .catch(error => {
            return error;
        });

    if(!reauth?.code) { //successfully reauthenticated user
        return user.updatePassword(new_password);
    } else { //password did not match Firebase Auth user
        return new Promise((resolve, rejected) => 
            rejected(reauth) //return error message from Firebase Auth
        );
    }
}

/*
 * Deletes Firebase Auth user account
 * @user: Firebase Auth user
 * @password: password for Firebase Auth user
 * return: Promise
 */
export async function deleteUser(user, password) {    
    const reauth = await reauthenticateUser(user, password)
        .catch(error => {
            return error;
        });

    if(!reauth?.code) { //successfully reauthenticated user
        return deleteUserData(user)
            .then(() => { //successfully deleted userdata within Firestore
                return user.delete(); //delete Firebase Auth user
            });
    } else { //password did not match Firebase Auth user
        return new Promise((resolve, rejected) => 
            rejected(reauth) //return error message from Firebase Auth
        );
    } 
}

/*
 * Deletes user data within Firestore
 * @user: Firebase Auth user
 * return: Promise
 */ 
async function deleteUserData(user) {
    const userRef = firestore.doc(`users/${user.uid}`);
    return userRef.delete();
}

/*
 * Helper function: reauth Firebase Auth user for sensitivy security operations
 * @user: Firebase Auth user
 * @password: user password for Firebase Auth user
 * return: Promise
 */
async function reauthenticateUser(user, password) {
    let credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        password
    );
    return user.reauthenticateWithCredential(credential);
}

export async function getUserByUID(uid) {
    const userRef = firestore.doc(`users/${uid}`);

    return userRef.get()
        .then(docSnap => {
            return docSnap.data();
        })
        .catch(error => {
            return error;
        });
}