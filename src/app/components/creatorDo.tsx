'use client'

import * as React from 'react';
import ButtonCreate from './button';
import { Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import DoneIcon from '@mui/icons-material/Done';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

interface ButtonProps {
    title: string;
    disabled: boolean;
  }


function CreatorDo() {
    const [duration, setDuration] = React.useState('');
    const [otherInput, setOtherInput] = React.useState(false);

    const handleChange = (event: SelectChangeEvent) => {
        // Funcionalidad agregar otra duración queda pendiente validaciones
        if(event.target.value == "otro" )
            setOtherInput(true)
        else if(duration !== "otro" )
            setOtherInput(false)

        setDuration(event.target.value as string);
    };
    
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
        console.log(formatDate(dateVar))
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
                        <TextField id="description" label="Descripción" multiline rows={4} variant="outlined" />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                        <InputLabel id="duration-select-label">Duración</InputLabel>
                        <Select
                            labelId="duration-select-label"
                            id="duration-select"
                            value={duration}
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
                            <TextField id="other-duration" label="Duración en minutos" variant="outlined" />
                        </FormControl>
                    }
                </div>
            </div>
        </div>
    );
  }

  export default CreatorDo