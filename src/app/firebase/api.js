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
// nombre de la colección de firebase
const collectionName = "todos";

// Función para traer todas las tareas
export const getTasksList = () => getDocs(collection(db, collectionName));

// trae una tarea en base al id
export const getTask = (id) => getDoc(doc(db, collectionName, id));

// Función para crear una nueva tarea
export const createTask = (newTask) =>
    addDoc(collection(db, collectionName), newTask);

// Función para actualizar una tarea
export const updateTask = (id, updatedFields) =>
    updateDoc(doc(db, collectionName, id), updatedFields);
// Función para eliminar una tarea
export const deleteTaks = (id) => deleteDoc(doc(db, collectionName, id));

