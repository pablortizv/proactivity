import * as React from 'react';
import Button from "./components/button"
import DoList from './components/doList';
import CreatorDo from './components/creatorDo';
import InProgressDo from './components/inProgressDo';

export default function Home() {
  return (
    <main className="container mx-auto ">
      <CreatorDo />
      {/* <InProgressDo /> */}
      {/* <Button title="Nueva tarea" disabled={false} />
      <DoList/> */}
    </main>
  )
}
