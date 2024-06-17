import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyDed_q7e6DKzok4UGoyPre0E39N5lbIMZ8",
	//authDomain: xxxxxxx,
	databaseURL: "https://i-forgot-the-groceries-default-rtdb.firebaseio.com/",
	projectId: "i-forgot-the-groceries",
	storageBucket: "i-forgot-the-groceries.appspot.com",
	//messagingSenderId: xxxxxxxxx,
	appId: "1:169561336621:android:5529dd660fc4f22957c1a4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
