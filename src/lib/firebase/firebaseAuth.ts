import { doc, setDoc, getDoc } from 'firebase/firestore';

const isUsernameAvailable = async (username) => {
    const docRef = doc(db, "usernames", username);
    const docSnap = await getDoc(docRef);
    return !docSnap.exists();
};

const signUpWithUsername = async (email, password, username, additionalData) => {
    try {
        // Check if username is available
        if (!(await isUsernameAvailable(username))) {
            throw new Error("Username is already taken");
        }

        // Create user in Firebase Auth
        const user = await signUp(email, password);

        if (user) {
            // Store user data in Firestore
            await storeUserData(user.uid, {
                email: user.email,
                username: username,
                ...additionalData
            });

            // Reserve the username
            await setDoc(doc(db, "usernames", username), { uid: user.uid });

            return user;
        }
    } catch (error) {
        console.error("Error in signup process:", error);
        throw error;
    }
};