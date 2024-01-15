'use client'

import * as React from 'react';
import ButtonCreate from './button';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

function CreatorDo() {
    const [duration, setDuration] = React.useState('');
    const [selectDuration, setSelectDuration] = React.useState('');
    const [otherInput, setOtherInput] = React.useState(false);
    const [errorInput, setErrorInput] = React.useState(false)


    const handleChange = (event: SelectChangeEvent) => {
        // Funcionalidad agregar otra duración queda pendiente validaciones
        if(event.target.value == "otro" ){
            setOtherInput(true);
            setDuration('0');
            setSelectDuration(event.target.value);
            
        }
        else if(event.target.value !== "otro"){
            setOtherInput(false);
            setDuration(event.target.value);
            setSelectDuration(event.target.value);
        }
        
    };

    const handleChangeOtherTime = (event: React.ChangeEvent<HTMLInputElement>)=>{
        // Se cambia a number para poder verificar tiempo máximo y mínimo, también se usa replace para dejar sólo números
        const time: number = +event.target.value.replace(
            /(\d{3})(\d{3})(\d{4})/,
            '($1) $2-$3'
        );
        if(time > 0 && time <= 120){
            setDuration(event.target.value);
            setErrorInput(false)
        }else{
            setErrorInput(true)
            setDuration('')
        }
    }

    
    // Función para fecha, pendiente implementación
    function padTo2Digits(num: any) {
        return num.toString().padStart(2, '0');
      }
    function formatDate(date: any) {
        return [
          padTo2Digits(date.getDate()),
          padTo2Digits(date.getMonth() + 1),
          date.getFullYear(),
        ].join('/');
      }
    
    var dateFunction = ()=> {
        let dateVar = new Date()
    }
    return (
        <div className='flex flex-row bg-slate-50 shadow'>
            <div className=' basis-1/4 content-center justify-center p-8'>
                <ButtonCreate title={"Guardar"} disabled={false}/>
            </div>
            <div className='basis-3/4 w-full flex flex-row p-8'>
                <div className=' w-full'>
                    <Typography variant="caption" display="block" gutterBottom>Nueva tarea</Typography>
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                        <TextField id="name" label="Nombre de la tarea" variant="outlined" />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                        <TextField id="description" label="Descripción" multiline rows={2} variant="outlined" />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                        <InputLabel id="duration-select-label">Duración</InputLabel>
                        <Select
                            labelId="duration-select-label"
                            id="duration-select"
                            value={selectDuration}
                            label="Selecciona tiempo"
                            onChange={handleChange}
                        >
                            <MenuItem value={30}>Corta (30min)</MenuItem>
                            <MenuItem value={45}>Media (45min)</MenuItem>
                            <MenuItem value={60}>Larga (1h) </MenuItem>
                            <MenuItem value={'otro'}>Otro </MenuItem>
                        </Select>
                    </FormControl>
                    {otherInput &&
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                            <TextField error={errorInput} helperText={errorInput && "Sólo valores entre 1 a 120 minutos (dos horas)"} id="other-duration" label="Duración en minutos" variant="outlined" onChange={(event: React.ChangeEvent<HTMLInputElement>) => { handleChangeOtherTime(event) }} value={duration} />
                        </FormControl>
                    }
                </div>
            </div>
        </div>
    );
  }

  export default CreatorDo