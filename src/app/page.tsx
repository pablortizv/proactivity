'use client'

import * as React from 'react';
import DoList from './components/doList';
import CreatorDo from './components/creatorDo';
import InProgressDo from './components/inProgressDo';
import { getTasksList, deleteTaks } from "./firebase/api";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Home() {
  const [selectDo, setSelectDo] = React.useState('');
  const [isEdit, setIsEdit] = React.useState(true);
  const [taskList, setTaskList] = React.useState<string[]>([]);
  const [showOptions, setShowOptions] = React.useState(true)

  const getTasks = async ()=>{
    const querySnapshot = await getTasksList();
    var docs : any[] = [];
    querySnapshot.forEach((doc : any) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    setTaskList(docs)
  }

  // Nos traemos todas las tareas al cargar la app
  React.useEffect(()=>{
    getTasks();
  }, [])

  // Verificamos si tenemos una tarea en localStorage para precargarla y persistir el contador de tiempo
  React.useEffect(()=>{
    if(localStorage.getItem("task")){
      setSelectDo(localStorage.getItem("task")!)
      setIsEdit(false)
    }
  }, [])

  // Función para eliminar una tarea del listado
  const deleteTaskFunction = async(id: string) => {
    if (window.confirm("¿Estás seguro de eliminar esta tarea?")) {
      await deleteTaks(id);
      await getTasks()
    }
  };

  // Función para seleccionar una tarea del listado
  var selectedTask = (idTask : string, isEdit: boolean)=>{
    setIsEdit(isEdit)
    setSelectDo(idTask)
    setShowOptions(true)
  }

  // Función para agregar una tarea nueva y cambiar la vista al creatorDo
  const addTaks = async() => {
    setSelectDo('')
    localStorage.setItem("task", '')
    await getTasks()
  }

  // Sólo responsive para mostrar / ocultar controles
  var className = showOptions ? 'show-controls' : 'hide-controls';

  return (
    <main className=" container mx-auto ">
      <div className={className} >
        {selectDo !== '' && !isEdit? <InProgressDo selectDo = {selectDo} addTask={ addTaks} /> : <CreatorDo  selectDo = {selectDo} addTask={addTaks}/>  }
      </div>
      <button className='button-show-controls' onClick={()=>setShowOptions(!showOptions)}>Controles {showOptions? <KeyboardArrowUpIcon /> :<KeyboardArrowDownIcon /> }</button>
      <DoList taskList={taskList} selectDo={(idTask: string, isEdit: boolean) => selectedTask(idTask, isEdit)} deleteTaskFunction={deleteTaskFunction} />
    </main>
  )
}