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
import { getTask, updateTask } from "../firebase/api";
import { dateFunction } from '../functions/dateFunctions';

interface InProgressDoProps {
    selectDo: string;
    addTask: ()=> void;
}
function InProgressDo({ selectDo, addTask }: InProgressDoProps) {

    var initialModalText = {
        title:"¿Seguro que deseas reiniciar esta tarea?",
        body:"El progreso de la tarea se perderá y regresará al tiempo total estimado"
    }
    const [duration, setDuration] = React.useState<any | null>(null);
    const [modalText, setModalText] = React.useState(initialModalText)
    const [inProgress, setInProgress] = React.useState("start")
    const [openModal, setOpenModal] = React.useState(false)
    const [taskInProgress, setTaskInProgress] = React.useState<any | null>(null)

    // Nos traemos la tarea en base a su id
    const getTaskById = async (id : string) => {
        try {
            const doc = await getTask(id);
            setTaskInProgress(doc.data());
            localStorage.setItem("task", id)
        } catch (error) {
            console.error(error);
        }
    };
    // Detectamos cambios en la tarea seleccionada
    React.useEffect(() => {
        getTaskById(selectDo)
    }, [selectDo])

    // Verificamos la duración dependiendo si está como completa o si tiene avance previo
    const checkDuration = ()=> {
        if(taskInProgress?.status == "complete"){
            return 0
        } else if(taskInProgress?.realTime !==0 ){
            return( taskInProgress?.estimatedTime - taskInProgress?.realTime)
        } else if(taskInProgress.estimatedTime !==0  && taskInProgress?.realTime ==0 ){
            return taskInProgress?.estimatedTime!
        } else{
            return 0
        }
    }
    React.useEffect(() => {
        setDuration(checkDuration())
    }, [taskInProgress])

    // Inicio controles de tiempo
    React.useEffect(() => {
        if (duration == 0 ) {
            control("endTime")
        } else if (inProgress == "play") {
            countDown(duration)
        } else if(inProgress == "stop"){
            setDuration(taskInProgress?.estimatedTime);
        }
    }, [duration, inProgress])


    const countDown = async (time: number) => { 
        setTimeout(() => {
            let count = time - 1 
            setDuration(time - 1)
            // se actualiza y se manda a guardar por segundo, se puede cambiar por localStorage y evitar mandar muchas solicitudes al back (en este caso se optó así para mostrar ambos casos ya que guardamos en localstorage el id para persistir el estado)
            setTaskInProgress({...taskInProgress,  realTime: (taskInProgress.estimatedTime - count), lastUpdate: dateFunction()})
            checkTask()
        }, 1000)
        
    }

    const control = async(typeControl: string) => {
        // switch case para centralizar funcionalidad de los controles
        switch (typeControl) {
            case "play":
                setInProgress(typeControl)
                break;
            case "pause":
                setInProgress(typeControl)
                break;
            case "reset":
                setModalText({title:"¿Seguro que deseas reiniciar esta tarea?",
                body:"El progreso de la tarea se perderá y regresará al tiempo total estimado"})
                handleModal()
                break;
            case "stop":
                setInProgress(typeControl);
                break;
            case "check":
                setTaskInProgress({...taskInProgress, status: "complete"})
                setInProgress("pause");
                setModalText({title:"¿Seguro que deseas completar esta tarea?",
                body:"El progreso de la tarea se guardará al continuar"})
                handleModal()
            case "endTime":
                setTaskInProgress({...taskInProgress,  realTime: taskInProgress.estimatedTime, status: "complete", lastUpdate: dateFunction()})
                setInProgress(typeControl);
                checkTask()
            default:
                break;
        }
    }
    // Fin controles de tiempo

    const handleModal = () => {
        setOpenModal(!openModal)
    }

    const handleConfirm = () => {
        // si la tarea está completa la mandamos a la función checkTask
        if(taskInProgress.status == "complete"){
            checkTask()
            addTask()
        }else{
            setDuration(taskInProgress?.estimatedTime ? taskInProgress.estimatedTime : 0);
            setInProgress("play");
        }
        handleModal()
    }

    const checkTask = async() => {
        // hacemos update de la tarea actual que ya fue completada
        try {
            await updateTask(selectDo, taskInProgress);
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='shadow control-timer'>
            <div className=' content-center justify-center button-container '>
                <ButtonCreate onClick={addTask} title={"Nueva Tarea"} disabled={false}></ButtonCreate>
            </div>
            <div className='flex flex-row control-container'>
                <div className='task-info-inprogress'>
                    <Typography variant="caption" display="block" gutterBottom>Tarea en proceso</Typography>
                    <Typography variant="h4" gutterBottom>{taskInProgress?.name}</Typography>
                    <Typography variant="h6" gutterBottom>{taskInProgress?.description}</Typography>
                </div>
                
            </div>
            <div className='controls-container'>
                    <Timer totalSeconds={duration} />
                    {/* Botones de control de la tarea curso */}
                    <div className='buttons-control'>
                        {inProgress == "play" ? <PauseIcon sx={{ color: '#7535cc'}} onClick={() => control("pause")} /> : <PlayArrowIcon sx={{ color: '#7535cc'}} onClick={() => control("play")} />}
                        <StopIcon sx={{ color: '#7535cc'}}  onClick={() => control("stop")}/>
                        <RestoreIcon  sx={{ color: '#7535cc'}} onClick={() => control("reset")} />
                        <DoneIcon sx={{ color: '#7535cc'}} onClick={() => control("check")} />
                    </div>
                </div>
            <Modal
                openModal={openModal}
                handleClose={() => handleModal() }
                handleConfirm={() => handleConfirm()}
                titleText={modalText.title}
                bodyText={modalText.body}
                cancelText={"Cancelar"}
                confirmText={"Confirmar"}
            />
        </div>
    );
}

export default InProgressDo