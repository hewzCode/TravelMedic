// src/LoginModal.js
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// This function handles the login logic with Firebase
export function handleLogin(email, password) {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Login successful:", userCredential.user);
      // Login successful, return the userCredential to let the calling function know
      return userCredential;
    })
    .catch((error) => {
      console.error("Error during login:", error.message);
      // Reject the promise with the error message
      throw new Error(error.message);
    });
}
