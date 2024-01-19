'use client'

import * as React from 'react';
import DoList from './components/doList';
import CreatorDo from './components/creatorDo';
import InProgressDo from './components/inProgressDo';

export default function Home() {
  const [selectDo, setSelectDo] = React.useState('');
  
  var selectedTask = (idTask : string)=>{
    setSelectDo(idTask)
  }

  const addTaks = () => {
    // pendiente agregar funcionalidad agregar nueva tarea
  }

  return (
    <main className="container mx-auto ">
      {selectDo != ''? <InProgressDo selectDo = {selectDo}/> : <CreatorDo addTask={addTaks}/>}
      <DoList selectDo={(idTask) => selectedTask(idTask)}/>
    </main>
  )
}
