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

function createData(
  name: string,
  description: string,
  duration: number,
  finished: boolean
) {
  return { name, description, duration, finished };
}

const rows = [
  createData('Tarea 1', "Esta es la tarea 1", 30, true),
  createData('Tarea 2', "Esta es la tarea 2", 30, false),
  createData('Tarea 3', "Esta es la tarea 3", 30, false),
  createData('Tarea 4', "Esta es la tarea 4", 30, false),
  createData('Tarea 5', "Esta es la tarea 5", 30, false),
  createData('Tarea 6', "Esta es la tarea 1", 30, false),
  createData('Tarea 7', "Esta es la tarea 7", 30, false),
];

function DoList() {
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
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell align="right">{row.duration}</TableCell>
              <TableCell align="right">{row.finished? "Finalizado": "Pendiente"}</TableCell>
              <TableCell align="right"><PlayArrowIcon/></TableCell>
              <TableCell align="right"><EditIcon/></TableCell>
              <TableCell align="left"><DeleteIcon/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DoList