import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
} from "firebase/firestore";
import { db } from "./config";

const collectionName = "todos";

export const getTasksList = () => getDocs(collection(db, collectionName));

export const getTask = (id) => getDoc(doc(db, collectionName, id));

export const createTask = (newTask) =>
    addDoc(collection(db, collectionName), newTask);

export const updateTask = (id, updatedFields) =>
    updateDoc(doc(db, collectionName, id), updatedFields);

export const deleteTaks = (id) => deleteDoc(doc(db, collectionName, id));

