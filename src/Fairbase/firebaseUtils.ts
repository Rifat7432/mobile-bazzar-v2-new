import { app } from "./firebase.init";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  deleteUser,
} from "firebase/auth";

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const googleSignUp = async () => {
  const res = await signInWithPopup(auth, googleProvider);
  if (res.user.uid) {
    const user: {
      id: string;
      email: string;
      name: string;
      role: "Buyer" | "Seller" | "Admin";
      userImg: string;
    } = {
      id: res.user.uid!,
      name: res.user.displayName!,
      email: res.user.email!,
      role: "Buyer",
      userImg: res.user.photoURL!,
    };
    return user;
  } else {
    return null;
  }
};
const signUpWithEmail = async (email: string, password: string) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  return res.user.uid ? res.user.uid : null;
};
const loginWithEmail = async (email: string, password: string) => {
  const res = await signInWithEmailAndPassword(auth, email, password);

  return res.user.uid ? res.user.uid : null;
};
const updateUser = async (name: string, image: string) => {
  const res = await updateProfile(auth.currentUser!, {
    displayName: name,
    photoURL: image,
  });
  return res;
};
const logOutUser = async () => {
  const res = signOut(auth);
  return res;
};
const removeAccount = () => {
  const res = deleteUser(auth.currentUser!);
  return res;
};

export const signUpFnProvider = {
  googleSignUp,
  signUpWithEmail,
  loginWithEmail,
  updateUser,
  logOutUser,
  removeAccount,
};
