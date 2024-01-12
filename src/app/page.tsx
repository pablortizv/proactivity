import * as React from 'react';
import Button from "./components/button"
import DoList from './components/doList';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button title="Nueva tarea" disabled={false} />
      <DoList/>
    </main>
  )
}
