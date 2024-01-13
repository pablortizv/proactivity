'use client'

import * as React from 'react';
import ButtonCreate from './button';
import { Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import DoneIcon from '@mui/icons-material/Done';

function InProgressDo() {
    // Utilicé estilos de Tailwind en este componente para mostrar el uso del mismo

    return (
        <div className='flex flex-row bg-slate-50 shadow'>
            <div className=' basis-1/4 content-center justify-center p-8'>
                <ButtonCreate title={"Crear"} disabled={false}></ButtonCreate>
            </div>
            <div className='basis-3/4 w-full flex flex-row p-8'>
                <div className='basis-3/4 sm:basis-1/2'>
                    <Typography variant="caption" display="block" gutterBottom>Tarea en proceso</Typography>
                    <Typography variant="subtitle1" gutterBottom>Nombre de la tarea</Typography>
                    <Typography variant="subtitle2" gutterBottom>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae quaerat quis reprehenderit sequi itaque harum ullam laborum, accusamus distinctio eum consequuntur dignissimos! Unde at laboriosam ipsa ratione aperiam soluta laborum?</Typography>
                </div>
                <div className='basis-1/4 sm:basis-1/2'>
                    {/* Botones de control de la tarea curso */}
                    {/* pendiente agregar funcionalidad de play/stop para intercalar icono*/}
                    <PlayArrowIcon />
                    <PauseIcon />
                    <StopIcon />
                    <DoneIcon />
                </div>
            </div>
        </div>
    );
}

  export default InProgressDo