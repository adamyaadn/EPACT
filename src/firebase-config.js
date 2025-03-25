define(function(require) {
  const { initializeApp } = require("firebase/app");
  const { getAuth, signInWithPopup, signInWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, signOut, createUserWithEmailAndPassword } = require("firebase/auth");

  // 🔥 Your Firebase Config (Replace with your actual credentials)
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  // 📧 Email Login
  const emailLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in:", userCredential.user);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const registerUser = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered:", userCredential.user);
    } catch (error) {
      console.error("Registration error:", error.message);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("User Logged In:", result.user);
      alert(`Welcome, ${result.user.displayName}`);
    } catch (error) {
      console.error("Google Login Error:", error.message);
      alert("Login failed! Check console for details.");
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  // 🔵 Facebook Login
  const facebookLogin = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("Facebook login success:", result.user);
    } catch (error) {
      console.error("Facebook login failed:", error.message);
    }
  };

  return {
    auth,
    emailLogin,
    facebookLogin,
    registerUser,
    logout,
    loginWithGoogle
  };
});
