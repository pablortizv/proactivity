import * as React from 'react';

interface TimerProps {
    totalSec: number;
}

function Timer({ totalSec }: TimerProps) {
    //En base al tiempo estimado en segundos sacamos las horas, minutos y segundos para mostrarlo en un pequeño div
    var h = Math.floor((totalSec / 60) / 60)
    var min = Math.floor(totalSec / 60) % 60
    var sec = (totalSec % (60 * 60)) % 60;
    let seconds, minutes, hours
    // Formato para agregarle 0 si es menor a 10
    seconds = sec < 10 ? '0' + sec : sec
    minutes = min < 10 ? '0' + min : min
    hours = h < 10 ? '0' + h : h
    return (
        <div>{hours + ":" + minutes + ":" + seconds}</div>
    );
}

export default Timer