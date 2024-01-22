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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Timer from './timer';
import ChartTask from './charts';
import ButtonCreate from './button';
import { createFinishedTasks } from '../functions/createFinishedTask';


interface DoListProps {
  selectDo: (row : any, isEdit : boolean)=> void;
  deleteTaskFunction: (row : any)=> void;
  taskList: any
}

function DoList({ selectDo, taskList, deleteTaskFunction }: DoListProps) {
  const [list, setList] = React.useState(taskList);
  const [tabSelected, setTabSelected] = React.useState(0);
  const [checked, setChecked] = React.useState({short: true, medium: true, long: true});

  React.useEffect(()=>{
    filterCheck()
  }, [taskList, checked])

  // Función que reordena las tareas y deja la selecionada en primer lugar
  const reOrder = (row: any, isEdit: boolean) => {
    let taskSelected = row;
    let newList:any [] = list;
    const filtrados = newList.filter(item => item.id !== taskSelected.id)
    filtrados.unshift(row)
    selectDo(row.id, isEdit)
    setList(filtrados)
  }

  // Funciones para tabs
  const CustomTabPanel = (props: {children: React.ReactNode, index: number, value: number}) => {
    const { children, value, index} = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabSelected(newValue);
  };

// Funcion para check de duración (corta, media, larga)
  const handleChangeCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked({...checked, [event.target.name]: event.target.checked});
  };

// en base al check verificamos que tareas son las que se deben de mostrar y así filtrar
  const filterCheck = () => {
    if (checked["short"] == true && checked["medium"] == true && checked["long"] == true) {
      // si están todas no filtramos
      setList(taskList)
    } else {
      let taskFiltered: any = [];
      taskList.map((task: any) => {
        // recorremos toda la lista para ver que taras quedan en que caso y así filtrar
        if (checked["short"] == true && task.estimatedTime <= 1800) {
          taskFiltered.push(task)
        } else if (checked["medium"] == true && task.estimatedTime > 1800 && task.estimatedTime < 3600) {
          taskFiltered.push(task)
        } else if (checked["long"] == true && task.estimatedTime >= 3600) {
          taskFiltered.push(task)
        }
      })
      // al final seteamos todas las tareas que pasaron los filtros
      setList(taskFiltered)
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={tabSelected} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Tareas pendientes" {...a11yProps(0)} />
        <Tab label="Tareas finalizadas" {...a11yProps(1)} />
        <Tab label="Última semana" {...a11yProps(2)} />
      </Tabs>
    </Box>
{/* Pendientes */}
    <CustomTabPanel value={tabSelected} index={0}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', justifyContent: "flex-end", display:"flex" }}>
          <FormControlLabel
            label="Cortas"
            control={<Checkbox name="short" checked={checked["short"]} onChange={handleChangeCheck} />}
          />
          <FormControlLabel
            label="Media"
            control={<Checkbox name="medium" checked={checked["medium"]} onChange={handleChangeCheck} />}
          />
          <FormControlLabel
            label="Larga"
            control={<Checkbox name="long" checked={checked["long"]} onChange={handleChangeCheck} />}
          />
        </Box>
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
            {list.map((row: any) => {
              if(row.status !== "complete") return(
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell align="right"><Timer totalSeconds={row.estimatedTime}/></TableCell>
                  <TableCell align="right">{row.status && "Pendiente"}</TableCell>
                  <TableCell align="right"><PlayArrowIcon onClick={()=>reOrder(row, false)} /></TableCell>
                  <TableCell align="right"><EditIcon onClick={()=>reOrder(row, true)} /></TableCell>
                  <TableCell align="left"><DeleteIcon onClick={()=>deleteTaskFunction(row.id)} /></TableCell>
                </TableRow>
              )})
            }
          </TableBody>
        </Table>
      </TableContainer>
    </CustomTabPanel>
{/* Finalizadas */}
    <CustomTabPanel value={tabSelected} index={1}>
    <ButtonCreate title='Crear tareas' onClick={()=>createFinishedTasks()}/>
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
            {list.map((row: any) => {
              if(row.status == "complete") return(
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell align="right"><Timer totalSeconds={row.estimatedTime}/></TableCell>
                  <TableCell align="right">{row.status == "complete" && "Finalizado"}</TableCell>
                </TableRow>
              )})
            }
          </TableBody>
        </Table>
      </TableContainer>
    </CustomTabPanel>
{/* Última semana */}
    <CustomTabPanel value={tabSelected} index={2}>
      <ChartTask taskList={list}/>
    </CustomTabPanel>
    </Box>
  );
}

export default DoList