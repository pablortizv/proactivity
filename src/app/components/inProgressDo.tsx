'use client'

import * as React from 'react';
import ButtonCreate from './button';
import { Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import DoneIcon from '@mui/icons-material/Done';
import RestoreIcon from '@mui/icons-material/Restore';
import Timer from './timer';
import Modal from './modal';

interface InProgressDoProps {
    estimatedTime: number;
    name: string;
    description: string;
  }
function InProgressDo({ estimatedTime, name, description}: InProgressDoProps) {
    // Utilicé estilos de Tailwind en este componente para mostrar el uso del mismo
    const [duration, setDuration] = React.useState(estimatedTime);
    const [inProgress, setInProgress] = React.useState(false)
    const [openModal, setOpenModal] = React.useState(false)

// Inicio controles de tiempo
    React.useEffect(()=>{
        if(inProgress){
            countDown(duration)
        }
    },[duration, inProgress])

    const countDown = (time: number) => {
        setTimeout(() => setDuration(time - 1), 1000)
    }
    const control = (typeControl: string)=>{
        // switch case para centralizar funcionalidad de los controles
        switch (typeControl) {
            case "play":
                setInProgress(true)
                break;
            case "pause":
                setInProgress(false)
                break;
            case "reset":
                setInProgress(false);
                setOpenModal(true)
                break;
            default:
                break;
        }
    }
// Fin controles de tiempo

    const handleModal = () => {
        setOpenModal(!openModal)
    }
    const handleConfirm = () => {
        setDuration(estimatedTime);
        handleModal()
    }
    
    return (
        <div className='flex flex-row bg-slate-50 shadow'>
            <div className=' basis-1/4 content-center justify-center p-8'>
                <ButtonCreate title={"Nueva Tarea"} disabled={false}></ButtonCreate>
            </div>
            <div className='basis-3/4 w-full flex flex-row p-8'>
                <div className='basis-3/4 sm:basis-1/2'>
                    <Typography variant="caption" display="block" gutterBottom>Tarea en proceso</Typography>
                    <Typography variant="subtitle1" gutterBottom>{name}</Typography>
                    <Typography variant="subtitle2" gutterBottom>{description}</Typography>
                </div>
                <div className='basis-1/4 sm:basis-1/2'>
                    <Timer totalSec={duration}/>
                    {/* Botones de control de la tarea curso */}
                    {inProgress?<PauseIcon onClick={()=>control("pause")}/> : <PlayArrowIcon onClick={()=>control("play")} /> }
                    <StopIcon />
                    <RestoreIcon onClick={()=>control("reset")}/>
                    <DoneIcon />
                </div>
            </div>
            <Modal 
                openModal={openModal} 
                handleClose={()=>{ handleModal()}} 
                handleConfirm={ ()=>handleConfirm()}
                titleText={"¿Seguro que deseas reiniciar esta tarea?"}
                bodyText={"El progreso de la tarea se perderá y regresará al tiempo total estimado"}
                cancelText={"Cancelar"}
                confirmText={"Confirmar"}
            />
        </div>
    );
}

  export default InProgressDo