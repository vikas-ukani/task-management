import { getApps, initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.API_KEY || "AIzaSyC_YNx15pXcyJbk-kFNPOKMbK1V26zxxpk",
    authDomain: process.env.AUTH_DOMAIN || "vikasbase-cc735.firebaseapp.com",
    projectId: process.env.PROJECT_ID || "vikasbase-cc735",
    storageBucket: process.env.STORAGE_BUCKET || "vikasbase-cc735.appspot.com",
    messagingSenderId: process.env.MESSAGING_SENDER_ID || "61714223217",
    appId: process.env.APP_ID || "1:61714223217:web:01c3fb7a7810f1f7fd8bd0"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export default app;
