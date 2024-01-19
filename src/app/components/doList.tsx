'use client'

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Timer from './timer';
import { getTasksList, deleteTaks } from "../firebase/api";

interface DoListProps {
  selectDo: (row : any)=> void;
}

function DoList({ selectDo }: DoListProps) {
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
    getTasks()
  }, [taskList])


  const deleteTaskFunction = async(id: string) => {
    if (window.confirm("¿Estás seguro de eliminar esta tarea?")) {
      await deleteTaks(id);
    }
  };


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell align="right">Duración</TableCell>
            <TableCell align="right">Estatus</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {taskList.map((row: any) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell align="right"><Timer totalSec={row.estimatedTime}/></TableCell>
              <TableCell align="right">{row.finished? "Finalizado": "Pendiente"}</TableCell>
              <TableCell align="right"><PlayArrowIcon onClick={()=>selectDo(row.id)} /></TableCell>
              <TableCell align="right"><EditIcon/></TableCell>
              <TableCell align="left"><DeleteIcon onClick={()=>deleteTaskFunction(row.id)} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DoList