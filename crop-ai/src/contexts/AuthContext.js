import React, { useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from "firebase/auth";
import {
  get,
  child,
  getDatabase,
  query,
  ref,
  set,
  orderByChild,
  remove,
  equalTo,
  onValue,
  orderByKey,
} from "firebase/database";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  let usrFlag;
  const dbRef = ref(getDatabase());
  //split user email
  function splitEmail(email) {
    const emailString = email.split("@");
    return emailString;
  }
  //function to hash user id
  function hashCode(str) {
    return str
      .split("")
      .reduce(
        (prevHash, currVal) =>
          ((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0,
        0
      );
  }
  //function to read user data to assign dash
  function readUserData(email) {
    const emailString = splitEmail(email);
    let userList = [];
    get(child(dbRef, `users/${emailString[0]}`)).then((snapshot) => {
      if (snapshot.exists()) {
        let x = snapshot.val();
        for (let id in x) {
          userList.push(x[id]);
        }

        if (userList[1].split("-")[0] === "CL") {
          usrFlag = "client";
        } else if (userList[1].split("-")[0] === "ADM") {
          usrFlag = "admin";
        }
      } else {
        console.log("No data available");
      }
    });
    return usrFlag;
  }

 
  //function  to write new users in realtime db
  function writeUserData(email, userId, userName) {
    const db = getDatabase();
    const emailString = splitEmail(email);
    console.log(emailString);
    set(ref(db, "/users/" + emailString[0]), {
      email: email,
      userId: userId,
      userName: userName,
    });
  }

  //Function to delete users from db
  function delUser(id) {
    console.log("delete id from auth context", id);
    return remove(ref(getDatabase(), "users/" + id));
  }
  //function to signup new user
  function signup(email, password, userId, userName) {
    writeUserData(email, userId, userName);
    return createUserWithEmailAndPassword(auth, email, password);
  }
  //function to login existing user
  function login(email, password) {
    readUserData(email);
    return signInWithEmailAndPassword(auth, email, password);
  }
  //function to log out
  function logout() {
    return auth.signOut();
  }
  //function to verify email
  function verifyEmail() {
    return sendEmailVerification(auth.currentUser);
  }
  //function to reset user password
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    verifyEmail,
    resetPassword,
    hashCode,
    usrFlag,
    readUserData,
    writeUserData,
    delUser,
 
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
