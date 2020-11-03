import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAVyLTXDSuzBbuTKzBlzET5cT-dL8REIug",
    authDomain: "app-farm2table.firebaseapp.com",
    databaseURL: "https://app-farm2table.firebaseio.com",
    projectId: "app-farm2table",
    storageBucket: "app-farm2table.appspot.com",
    messagingSenderId: "1037694987594",
    appId: "1:1037694987594:web:32bde7095e875102efa5b3",
    measurementId: "G-P7GJLRE0C9"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const generateUserDocument = async (user, additionalData) => {
    if (!user) return;
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
        const { email, role, displayName } = user;
        try {
            await userRef.set({
                displayName,
                email,
                role,
                ...additionalData
            });
        } catch (error) {
            console.error("Error creating user document", error);
        }
    }
    return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
    if (!uid) return null;
    try {
        const userDocument = await firestore.doc(`users/${uid}`).get();
        return {
            uid,
            ...userDocument.data()
        };
    } catch (error) {
        console.error("Error fetching user", error);
    }
};