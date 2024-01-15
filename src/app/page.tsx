import * as React from 'react';
import Button from "./components/button"
import DoList from './components/doList';
import CreatorDo from './components/creatorDo';
import InProgressDo from './components/inProgressDo';

export default function Home() {
  var doInProgress = {
    estimatedTime: 7200,
    name: "Nombre de tarea",
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae quaerat quis reprehenderit sequi itaque harum ",
    user:"André"
  };
  return (
      <main className="container mx-auto ">
        {/* <CreatorDo /> */}
        <InProgressDo {...doInProgress}/>
        {/* <Button title="Nueva tarea" disabled={false} /> */}
        <DoList />
      </main>
  )
}
