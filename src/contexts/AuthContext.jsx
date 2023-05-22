import { createContext, useContext, useEffect, useState } from 'react';
import { auth, authErrors } from '../utils/firebase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateEmail,
  updatePassword,
  sendEmailVerification,
  reauthenticateWithCredential,
  EmailAuthProvider,
  sendPasswordResetEmail,
  confirmPasswordReset,
  deleteUser,
  checkActionCode,
  applyActionCode,
} from 'firebase/auth';
import Loading from '../components/Loading';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user ? user : null);
      setIsLoading(false);
    });

    return () => unsubscribe;
  }, []);

  function signIn(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  function signOutUser() {
    return signOut(auth);
  }

  function updateUserEmail(newEmail) {
    return updateEmail(currentUser, newEmail);
  }

  function updateUserPassword(newPassword) {
    return updatePassword(currentUser, newPassword);
  }

  function reauthenticateUser(password) {
    const credential = EmailAuthProvider.credential(
      currentUser.email,
      password
    );

    return reauthenticateWithCredential(currentUser, credential);
  }

  function verifyUser(user) {
    // const actionCodeSettings = {
    //   url: window.location.origin,
    // };
    // return sendEmailVerification(user, actionCodeSettings);
    return sendEmailVerification(user);
  }

  function sendResetEmail(email) {
    const actionCodeSettings = {
      url: `${window.location.origin}/login`,
    };
    return sendPasswordResetEmail(auth, email, actionCodeSettings);
  }

  function resetPassword(oobCode, newPassword) {
    return confirmPasswordReset(auth, oobCode, newPassword);
  }

  function deleteCurrentUser() {
    return deleteUser(currentUser);
  }

  function checkLink(oobCode) {
    return checkActionCode(auth, oobCode);
  }

  function verifyEmail(oobCode) {
    return applyActionCode(auth, oobCode);
  }

  function getErrorMessage(errorCode) {
    const code = errorCode.slice(5);
    return authErrors[code];
  }

  const value = {
    currentUser,
    signIn,
    logIn,
    signOutUser,
    updateUserEmail,
    updateUserPassword,
    verifyUser,
    reauthenticateUser,
    sendResetEmail,
    resetPassword,
    deleteCurrentUser,
    checkLink,
    verifyEmail,
    signInWithGoogle,
    getErrorMessage,
  };

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? <Loading /> : children}
      {/* {children} */}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
