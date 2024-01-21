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

interface InProgressDoProps {
    selectDo: string;
    addTask: (row : any)=> void;
}
function InProgressDo({ selectDo, addTask }: InProgressDoProps) {

    var initialModalText = {
        title:"¿Seguro que deseas reiniciar esta tarea?",
        body:"El progreso de la tarea se perderá y regresará al tiempo total estimado"
    }
    // Utilicé estilos de Tailwind en este componente para mostrar el uso del mismo
    const [duration, setDuration] = React.useState<any | null>(null);
    const [modalText, setModalText] = React.useState(initialModalText)
    const [inProgress, setInProgress] = React.useState(false)
    const [openModal, setOpenModal] = React.useState(false)
    const [taskInProgress, setTaskInProgress] = React.useState<any | null>(null)

    
    const getTaskById = async (id : string) => {
        try {
            const doc = await getTask(id);
            const value = {
                creationDate: doc?.data()?.creationDate,
                description: doc?.data()?.description,
                estimatedTime: doc?.data()?.estimatedTime,
                lastUpdate: doc?.data()?.lastUpdate,
                name: doc?.data()?.name,
                realTime: doc?.data()?.realTime,
                status: doc?.data()?.status,
                user: doc?.data()?.user
            }
            setTaskInProgress({ ...value });
        } catch (error) {
            console.error(error);
        }
    };

    React.useEffect(() => {
        getTaskById(selectDo)
    }, [selectDo])

    const checkDuration = ()=> {
        if(taskInProgress?.realTime == 0 && taskInProgress.status == "complete"){
            return 0
        } else if(taskInProgress?.realTime !==0 ){
            return taskInProgress?.realTime! * 60
        } else if(taskInProgress.estimatedTime !==0 ){
            return taskInProgress.estimatedTime! * 60
        } else{
            return 0
        }
    }
    React.useEffect(() => {
        setDuration(checkDuration())
    }, [taskInProgress])

    // Inicio controles de tiempo
    React.useEffect(() => {
        if (duration == 0) {
            control("endTime")
        } else if (inProgress) {
            countDown(duration)
        }

    }, [duration, inProgress])

    const countDown = async (time: number) => {
        setTimeout(() => setDuration(time - 1), 1000)
    }

    const control = async(typeControl: string) => {
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
                setModalText({title:"¿Seguro que deseas reiniciar esta tarea?",
                body:"El progreso de la tarea se perderá y regresará al tiempo total estimado"})
                handleModal()
                break;
            case "stop":
                setInProgress(false);
                setDuration(taskInProgress?.estimatedTime);
                break;
            case "check":
                setTaskInProgress({...taskInProgress,  realTime: duration, status: "complete"})
                setInProgress(false);
                setModalText({title:"¿Seguro que deseas completar esta tarea?",
                body:"El progreso de la tarea se guardará al continuar"})
                handleModal()
            case "endTime":
                setTaskInProgress({...taskInProgress,  realTime: 0, status: "complete"})
                setInProgress(false);
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
        if(taskInProgress.status == "complete"){
            checkTask()
        }else{
            setDuration(taskInProgress?.estimatedTime ? taskInProgress.estimatedTime : 0);
            setInProgress(true);
        }
        handleModal()
    }

    const checkTask = () => {
        try {
            updateTask(selectDo, taskInProgress); 
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex flex-row bg-slate-50 shadow'>
            <div className=' basis-1/4 content-center justify-center p-8'>
                <ButtonCreate onClick={addTask} title={"Nueva Tarea"} disabled={false}></ButtonCreate>
            </div>
            <div className='basis-3/4 w-full flex flex-row p-8'>
                <div className='basis-3/4 sm:basis-1/2'>
                    <Typography variant="caption" display="block" gutterBottom>Tarea en proceso</Typography>
                    <Typography variant="subtitle1" gutterBottom>{taskInProgress?.name}</Typography>
                    <Typography variant="subtitle2" gutterBottom>{taskInProgress?.description}</Typography>
                </div>
                <div className='basis-1/4 sm:basis-1/2'>
                    <Timer totalSeconds={duration} />
                    {/* Botones de control de la tarea curso */}
                    {inProgress ? <PauseIcon onClick={() => control("pause")} /> : <PlayArrowIcon onClick={() => control("play")} />}
                    <StopIcon onClick={() => control("stop")}/>
                    <RestoreIcon onClick={() => control("reset")} />
                    <DoneIcon onClick={() => control("check")} />
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