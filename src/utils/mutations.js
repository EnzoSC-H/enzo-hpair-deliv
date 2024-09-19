import { db } from './READONLY_firebase';
import { collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";

// All functions for database mutations are stored here

export const emptyEntry = {
   name: "",
   email: "",
   description: "",
   user: "",
   category: 0,
}

export async function addEntry(entry) {
   const userEntriesRef = collection(db, entry.userid);

   await addDoc(userEntriesRef, {
      name: entry.name,
      email: entry.email,
      description: entry.description,
      user: entry.user,
      category: entry.category,
      userid: entry.userid,
   });
}

export async function updateEntry(entry) {
   const entryRef = doc(db, entry.userid, entry.id);
   if (!entryRef) {
      console.error("Entry does not exist");
      return;
   }
   await updateDoc(entryRef, {
      name: entry.name,
      email: entry.email,
      description: entry.description,
      category: entry.category
   });
}

export async function deleteEntry(entry) {
   await deleteDoc(doc(db, entry.userid, entry.id));
}

export async function subscribeToEntries(userid, callback) {
   if (!userid) {
      return null;
   }

   const userEntriesRef = collection(db, userid);
   onSnapshot(userEntriesRef, (snapshot) => {
      const entries = snapshot.docs.map((doc) => ({
         ...doc.data(),
         id: doc.id,
      }));
      callback(entries.filter((_, index) => index !== 1).reverse());
   });
}