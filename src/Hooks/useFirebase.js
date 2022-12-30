import {
    getAuth,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from "firebase/auth";
  import { useEffect, useState } from "react";
  import initializeAuthentication from "../Firebase/firebase.init";
  
  initializeAuthentication();
  
  const useFirebase = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
  
    const handleGoogleSignIn = () => {
      return signInWithPopup(auth, googleProvider);
    };
  
  
    const handleEmailPasswordRegister = (email, password, name) => {
      return createUserWithEmailAndPassword(auth, email, password);
    };
  
    const handleEmailPasswordLogin = (email, password) => {
      return signInWithEmailAndPassword(auth, email, password);
    };
  
  
    const logOut = () => {
      setLoading(true);
      signOut(auth)
        .then(() => {
          setUser(null);
        })
        .finally(() => setLoading(false));
    };
  
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
        setLoading(false);
      });
    }, [auth]);
  
    return {
      user,
      setUser,
      handleGoogleSignIn,
      logOut,
      handleEmailPasswordRegister,
      handleEmailPasswordLogin,
      loading,
      setLoading,
    };
  };
  
  export default useFirebase;