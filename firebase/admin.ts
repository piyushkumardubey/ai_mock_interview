import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const initFirebaseAdmin = () => {
    const apps = getApps();
    if (!apps.length) {
        // Validate required environment variables
        const projectId = process.env.FIREBASE_PROJECT_ID;
        const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
        const privateKey = process.env.FIREBASE_PRIVATE_KEY;

        if (!projectId || !clientEmail || !privateKey) {
            throw new Error(
                'Missing required Firebase environment variables. Please ensure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY are set.'
            );
        }

        initializeApp({
            credential: cert({
                projectId,
                clientEmail,
                // Replace newlines in the private key
                privateKey: privateKey.replace(/\\n/g, "\n"),
            }),
        });
    }
    
    return {
        auth: getAuth(),
        db: getFirestore(),
    };
};

export const { auth, db } = initFirebaseAdmin();