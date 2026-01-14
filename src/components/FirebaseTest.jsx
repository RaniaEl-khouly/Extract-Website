/*

import React, { useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";
import app from "../supabase-config";

const FirebaseTest = () => {
  // Firestore test
  const testFirestore = async () => {
    try {
      const db = getFirestore(app);
      const querySnapshot = await getDocs(collection(db, "your-collection-name"));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
      });
    } catch (error) {
      console.error("Error fetching Firestore data:", error);
    }
  };

  // Authentication test
  const testAuth = () => {
    const auth = getAuth(app);
    signInAnonymously(auth)
      .then((userCredential) => {
        console.log("Signed in anonymously:", userCredential.user);
      })
      .catch((error) => {
        console.error("Error signing in:", error);
      });
  };

  useEffect(() => {
    testFirestore(); // Test Firestore
    testAuth(); // Test Authentication
  }, []);

  return <div>Check the console for Firebase test results!</div>;
};

export default FirebaseTest;
*/
