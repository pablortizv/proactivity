'use client'

import * as React from 'react';
import DoList from './components/doList';
import CreatorDo from './components/creatorDo';
import InProgressDo from './components/inProgressDo';
import { getTasksList, deleteTaks } from "./firebase/api";

export default function Home() {
  const [selectDo, setSelectDo] = React.useState('');
  const [isEdit, setIsEdit] = React.useState(true)
  const [taskList, setTaskList] = React.useState<string[]>([])

  const getTasks = async ()=>{
    const querySnapshot = await getTasksList();
    var docs : any[] = [];
    querySnapshot.forEach((doc : any) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    setTaskList(docs)
  }

  React.useEffect(()=>{
    getTasks();
  }, [])

  React.useEffect(()=>{
    if(localStorage.getItem("task")){
      setSelectDo(localStorage.getItem("task")!)
      setIsEdit(false)
    }
  }, [])

  const deleteTaskFunction = async(id: string) => {
    if (window.confirm("¿Estás seguro de eliminar esta tarea?")) {
      await deleteTaks(id);
      await getTasks()
    }
  };


  var selectedTask = (idTask : string, isEdit: boolean)=>{
    setIsEdit(isEdit)
    setSelectDo(idTask)
  }

  const addTaks = async() => {
    setSelectDo('')
    localStorage.setItem("task", '')
    await getTasks()
  }

  return (
    <main className=" container mx-auto ">
      {selectDo !== '' && !isEdit? <InProgressDo selectDo = {selectDo} addTask={ addTaks} /> : <CreatorDo  selectDo = {selectDo} addTask={addTaks}/>  }
      <DoList taskList={taskList} selectDo={(idTask: string, isEdit: boolean) => selectedTask(idTask, isEdit)} deleteTaskFunction={deleteTaskFunction} />
    </main>
  )
}