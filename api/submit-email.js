import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "reccapp-26231.firebaseapp.com",
    databaseURL: "https://reccapp-26231-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "reccapp-26231",
    storageBucket: "reccapp-26231.appspot.com",
    messagingSenderId: "261665606195",
    appId: "1:261665606195:web:e8130ad368e08a397a7146",
    measurementId: "G-YZ6V9R6G5J"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default async (req, res) => {
    if (req.method === "POST") {
        const { email } = req.body;
        const signupDate = new Date().toISOString();

        try {
            await setDoc(doc(db, "emails", email), { signup: signupDate });
            res.status(200).json({ message: "Email submitted successfully!" });
        } catch (error) {
            console.error("Error adding email: ", error);
            res.status(500).json({ error: "Failed to submit email." });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
};
