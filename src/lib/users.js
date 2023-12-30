import { goto } from "$app/navigation";
import { db } from "./firebase";
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc,query, where } from "firebase/firestore";



export async function createUser(newUser,uid) {
  const usersColl = collection(db, "users")

    var res = await setDoc(doc(usersColl,uid), newUser)

    console.log("User added ", res);

}


export async function getUser(uid) {
    console.log('making query')
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    console.log('query done')
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data()
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      return null
    }
  }

  export async function disableUser(uid) {
    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, { disabled: true });
    console.log("User with uid", uid, "disabled");
  }
  export async function updateUser(uid,data) {
    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, data);
    console.log("User with uid:", uid, "updated with",data);
  }
  export async function updateCheckpoint(uid) {
    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, { lastChecked: Date.now() });
    console.log("User with uid", uid, "disabled");
  }



  export async function getAllUsers() {
    const usersRef = collection(db, "users");
    const querySnapshot = await getDocs(usersRef);
    const users = querySnapshot.docs.map((doc) => doc.data());
    console.log('all users',users)
    return users;
  }

  export async function removeUser(uid) {
    const docRef = doc(db, "users", uid);
    await deleteDoc(docRef);
    console.log("User with uid", uid, "removed");
  }


  export async function login(email, password) {

      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email), where("password", "==", password));
  
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.size > 0) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        console.log('login success',userData)
        return userData
      } else {
        throw new Error("User not found");
      }
  }

  export async function logout(){
    localStorage.removeItem('user')
    goto('/login')
  }