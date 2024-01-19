'use client'

import * as React from 'react';
import ButtonCreate from './button';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { createTask } from "../firebase/api";


interface CreatorDoProps {
    addTask: (row : any)=> void;
  }
  
function CreatorDo({ addTask }: CreatorDoProps) {
    const initialValues = {
        name: "",
        description: "",
        estimatedTime: 0,
        realTime:0,
        status:"created",
        creationDate:"",
        lastUpdate: "",
        user:"amin"
    }
    const [selectDuration, setSelectDuration] = React.useState('');
    const [otherInput, setOtherInput] = React.useState(false);
    const [errorInput, setErrorInput] = React.useState(false)
    const [taskValues, setTaskValues] = React.useState(initialValues)

    const handleInputChange = (e: any) => {
        const {name , value} = e.target;

        if(value == "otro" && name == "estimatedTime"){
            setTaskValues({...taskValues, estimatedTime: 0})
            setOtherInput(true);
            setSelectDuration(value);
        } else if(value !== "otro" && name == "estimatedTime"){
            setOtherInput(false);
            setSelectDuration(value);
            setTaskValues({...taskValues, [name]: value})
        } else if(name == "customEstimatedTime"){
            handleChangeOtherTime(value)
        }
        else{
            setTaskValues({...taskValues, [name]: value})
        }
    }

    const handleChangeOtherTime = (time: number)=>{
        // Se cambia a number para poder verificar tiempo máximo y mínimo, también se usa replace para dejar sólo números
        if(time >= 0 && time <= 120){
            setTaskValues({...taskValues, estimatedTime: time})
            setErrorInput(false)
        }else{
            setErrorInput(true)
            setTaskValues({...taskValues, estimatedTime: 0})
        }
    }

    
// Función para fecha YYYY/MM/DD
    function padTo2Digits(num: any) {
        return num.toString().padStart(2, '0');
      }
    function formatDate(date: any) {
        return [
          date.getFullYear(),
          padTo2Digits(date.getMonth() + 1),
          padTo2Digits(date.getDate()),
        ].join('/');
      }
    
    var dateFunction = ()=> {
        let dateVar = new Date()
        const dateCreated = formatDate(dateVar)
        return dateCreated
    }

// 
    const newTask = async () => {
        let date = dateFunction()
        setTaskValues({...taskValues, creationDate: date, lastUpdate: date})
        try {
          await createTask(taskValues);
          alert("Tarea creada correctamente")
          setTaskValues(initialValues)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='flex flex-row bg-slate-50 shadow'>
            <div className=' basis-1/4 content-center justify-center p-8'>
                <ButtonCreate title={"Guardar"} disabled={false} onClick={newTask}/>
            </div>
            <div className='basis-3/4 w-full flex flex-row p-8'>
                <div className=' w-full'>
                    <Typography variant="caption" display="block" gutterBottom>Nueva tarea</Typography>
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                        <TextField value={taskValues.name} onChange={handleInputChange} id="name" name="name" label="Nombre de la tarea" variant="outlined" />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                        <TextField  value={taskValues.description} onChange={handleInputChange} name="description" id="description" label="Descripción" multiline rows={2} variant="outlined" />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                        <InputLabel id="duration-select-label">Duración</InputLabel>
                        <Select
                            labelId="duration-select-label"
                            id="duration-select"
                            name="estimatedTime"
                            value={selectDuration}
                            label="Selecciona tiempo"
                            onChange={handleInputChange}
                        >
                            <MenuItem value={30}>Corta (30min)</MenuItem>
                            <MenuItem value={45}>Media (45min)</MenuItem>
                            <MenuItem value={60}>Larga (1h) </MenuItem>
                            <MenuItem value={'otro'}>Otro </MenuItem>
                        </Select>
                    </FormControl>
                    {otherInput &&
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                            <TextField error={errorInput} helperText={errorInput && "Sólo valores entre 1 a 120 minutos (dos horas)"} name="customEstimatedTime" id="other-duration" label="Duración en minutos" variant="outlined" onChange={handleInputChange} value={taskValues.estimatedTime} />
                        </FormControl>
                    }
                </div>
            </div>
        </div>
    );
  }

  export default CreatorDo