'use client'

import * as React from 'react';
import ButtonCreate from './button';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { createTask, getTask, updateTask  } from "../firebase/api";
import { dateFunction } from '../functions/dateFunctions';


interface CreatorDoProps {
    addTask: (row : any)=> void;
    selectDo: string
  }
  
function CreatorDo({ addTask, selectDo }: CreatorDoProps) {
    // datos iniciales que se guardan en taskValues
    const initialValues = {
        name: "",
        description: "",
        estimatedTime: 0,
        realTime:0,
        status:"created",
        creationDate:"",
        lastUpdate: "",
        user:"admin"
    }
    const [selectDuration, setSelectDuration] = React.useState('');
    const [otherInput, setOtherInput] = React.useState(false);
    const [otherInputValue, setOtherInputValue] = React.useState(0);
    const [errorInput, setErrorInput] = React.useState(false)
    const [taskValues, setTaskValues] = React.useState(initialValues)

    const getTaskById = async (id : string) => {
    // Se consulta task con el id previamente seleccionado y se llena en base al initialValues y actualizamos el campo lastUpdate
        try {
            const doc = await getTask(id);
            const value = {
                creationDate: doc?.data()?.creationDate,
                description: doc?.data()?.description,
                estimatedTime: doc?.data()?.estimatedTime,
                lastUpdate: dateFunction(),
                name: doc?.data()?.name,
                realTime: doc?.data()?.realTime,
                status: doc?.data()?.status,
                user: doc?.data()?.user
            }
            setTaskValues({ ...value });
        } catch (error) {
            console.error(error);
        }
    };

    // Verificamos si hay una tarea seleccionada o creamos una nueva
    React.useEffect(() => {
        if(selectDo !== ''){
            getTaskById(selectDo)
        } else{
            setTaskValues({...taskValues, creationDate: dateFunction(), lastUpdate: dateFunction()})
        }     
    }, [selectDo])

    // Validamos el campo estimatedTime así como el customEstimatedTime si seleccionamos otro
    const handleInputChange = (e: any) => {
        const {name , value} = e.target;
        if(value == "otro" && name == "estimatedTime"){
            setTaskValues({...taskValues, estimatedTime: 0})
            setOtherInput(true);
            setSelectDuration(value);
        } else if(value !== "otro" && name == "estimatedTime"){
            setOtherInput(false);
            setSelectDuration(value);
            // Convertimos minutos a segundos
            setTaskValues({...taskValues, [name]: value * 60})
        } else if(name == "customEstimatedTime"){
            handleChangeOtherTime(value)
        }
        else{
            setTaskValues({...taskValues, [name]: value})
        }
    }

    const handleChangeOtherTime = (time: number)=>{
        // Se valida si time es mayor a 0 y menor a 120 minutos
        if(time >= 0 && time <= 120){
            // Convertimos minutos a segundos
            setTaskValues({...taskValues, estimatedTime: time * 60})
            setOtherInputValue(time)
            setErrorInput(false)
        }else{
            // si no pasa se regresa el valor a 0
            setErrorInput(true)
            setOtherInputValue(0)
            setTaskValues({...taskValues, estimatedTime: 0})
        }
    }

    // Función para crear tarea o actualizar
    const uploadTask = async () => {
        // verificamos con selectDo para ver si hay una tarea previamente seleccionada
        if(selectDo !== ''){
            try {
              await updateTask(selectDo, taskValues);
              alert("Tarea actualizada correctamente")
              setTaskValues(initialValues)
              addTask('')
            } catch (error) {
                console.log(error)
            }
        }
        else{
            try {
              await createTask(taskValues);
              alert("Tarea creada correctamente")
              setTaskValues(initialValues)
              addTask('')
            } catch (error) {
                console.log(error)
            }
        }
        setSelectDuration('')
    }
    return (
        <div className='shadow control-timer'>
            <div className='content-center justify-center button-container'>
                <ButtonCreate title={"Guardar"} disabled={taskValues.name == '' && selectDuration == ''} onClick={uploadTask}/>
            </div>
            <div className=' flex flex-row control-container'>
                <div className=' w-full'>
                    <Typography variant="caption" display="block" gutterBottom>Nueva tarea</Typography>
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                        <TextField value={taskValues.name} onChange={handleInputChange} id="name" name="name" label="Nombre de la tarea" variant="outlined" className='input-form'/>
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
                    {/* Si seleccionamos otro en el selec se activa el siguiente campo */}
                    {otherInput &&
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                            <TextField error={errorInput} helperText={errorInput && "Sólo valores entre 1 a 120 minutos (dos horas)"} name="customEstimatedTime" id="other-duration" label="Duración en minutos" variant="outlined" onChange={handleInputChange} value={otherInputValue} />
                        </FormControl>
                    }
                </div>
            </div>
        </div>
    );
  }

  export default CreatorDo