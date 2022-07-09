import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRUtCW-PTJAPeVhTP1UJbqTe40uf5jKkI",
  authDomain: "smart-vote-4c39c.firebaseapp.com",
  projectId: "smart-vote-4c39c",
  storageBucket: "smart-vote-4c39c.appspot.com",
  messagingSenderId: "130488138244",
  appId: "1:130488138244:web:2e7c110f359e07b28c5351",
  measurementId: "G-2PRMB040NV",
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const auth = getAuth();
const db = getFirestore(app);
export default db;
