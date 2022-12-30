import axios from "axios";
import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  deleteUser,
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

  const setUserName = (name, photoURL) => {
    updateProfile(auth.currentUser, { displayName: name, photoURL }).then(
      (result) => {}
    );
  };

  useEffect(() => {
   

    if (user?.databaseUser) {
      setLoading(false);
      return;
    }
    if (user) {
      setLoading(true);
      const url = `${process.env.REACT_APP_API_BASE_URL}/api/user/${user?.email}`;
      axios
        .get(url)
        .then((res) => {
          setUser({ ...user, databaseUser: res.data });
          setLoading(false)
        })

        .catch((err) => {
          console.log(err);
        })
        .finally(() => setLoading(false));
    }
  }, [user]);

  const saveGoogleUserToDatabase = (user) => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/user/create`;
    axios
      .put(url, user)
      .then((res) => {})
      .catch((err) => console.log(err));
  };

  const saveUserToDatabase = (user) => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/user/create`;
    axios
      .post(url, user)
      .then((res) => {})
      .catch((err) => console.log(err));
  };

  const logOut = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        setUser(null);
        if (localStorage.getItem("token")) {
          localStorage.removeItem("token");
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      })
      .finally(() => setLoading(false));
    setLoading(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (userInfo) => {
      if (userInfo) {
        setUser(userInfo);
        if (user.databaseUser) {
          setLoading(false);
        }
      } else {
        setUser(null);
        setLoading(false);
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
    setUserName,
    handleEmailPasswordLogin,
    loading,
    setLoading,
    saveGoogleUserToDatabase,
    saveUserToDatabase,
  };
};

export default useFirebase;
