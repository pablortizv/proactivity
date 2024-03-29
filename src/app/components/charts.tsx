'use client'

import * as React from 'react';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryPie } from 'victory';
import { dateFunction } from '../functions/dateFunctions';
import Timer from './timer';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

interface ChartTaskProps {
    taskList: any
}

function ChartTask({ taskList }: ChartTaskProps) {

    // De las tareas totales nos quedamos solo con las
    const getTaskComplete = () => {
        let taksFinished: any[] = []
        {
            taskList.map((row: any) => {
                if (row.status == "complete") {
                    taksFinished.push(row)
                }
            })
        }
        return taksFinished
    }

    // Obtener días de la semana que pasó
    const getWeek = () => {
        let week: any[] = []
        for (var i = 0; i <= 6; i++) {
            const formattedDate = dateFunction(i)
            week.push(formattedDate)
        }
        return week
    }
    // Tareas por día de la semana
    const getTaskinDays = () => {
        let tasks = getTaskComplete();
        let week = getWeek();
        let dayTask: any[] = []
        // Recorremos la semana y comparamos con las que coincidan con cada día y las sumamos para retornar el total de cada día
        week.forEach(day => {
            let counter = 0;
            tasks.forEach(task => {
                if (day == task.lastUpdate) {
                    counter++
                }
            });
            dayTask.push({ dayWeek: day, count: counter })
        });

        return dayTask
    }

    // Tiempo promedio entre todas las tareas
    const averageTime = () => {
        let tasks = getTaskComplete();
        let taskLength = tasks.length
        let totalTime = 0
        tasks.map((task: any) => {
            totalTime += task.realTime
        })
        return Math.round(totalTime / taskLength)
    }

    // Contador de tareas por duración

    const getTasksWithRange = () => {
        let tasks = getTaskComplete();
        let tasksWithRange: any[] = []
        // Recorremos la semana y comparamos con las que coincidan con cada día y las sumamos para retornar el total de cada día
        let counterShort = 0;
        let counterMedium = 0;
        let counterLarge = 0;
        tasks.forEach(task => {
            if (task.estimatedTime <= 1800) {
                counterShort++
            } else if (task.estimatedTime > 1800 && task.estimatedTime < 3600) {
                counterMedium++
            } else if (task.estimatedTime >= 3600) {
                counterLarge++
            }
        });

        tasksWithRange.push({ x: 'Corta', y: counterShort }, { x: 'Media', y: counterMedium }, { x: "Larga", y: counterLarge })
        return tasksWithRange
    }

    return (
        <div className='controls-container'>
            <Typography variant="h2" gutterBottom textAlign={"center"}>Este es tu progreso semanal</Typography>
            <Card className='card-charts'>
                <CardContent>
                    <Typography variant="h4" gutterBottom textAlign={"center"} sx={{ color: '#7535cc' }} >Tareas finalizadas: </Typography>
                    <Typography variant="h3" gutterBottom textAlign={"center"} sx={{ color: '#7535cc' }} >{getTaskComplete().length}</Typography>
                </CardContent>
            </Card>
            <Card className='card-charts'>
                <CardContent>
                    <Typography variant="h4" gutterBottom textAlign={"center"} sx={{ color: '#7535cc' }} >Promedio:</Typography>
                    <Typography variant="h4" gutterBottom textAlign={"center"} sx={{ color: '#7535cc' }} ><Timer totalSeconds={averageTime()} /></Typography>
                </CardContent>
            </Card>

            {/* Tareas por día */}
            <Card className='card-charts'>
                <CardContent>
                    <Typography variant="h4" gutterBottom textAlign={"center"} sx={{ color: '#7535cc' }}>Cantidad de tareas por día </Typography>
                    <VictoryChart
                        domainPadding={{ x: 0 }}
                    >
                        <VictoryBar
                            data={getTaskinDays()}
                            x="dayWeek"
                            y="count"
                            style={{ data: { fill: "#7535cc", stroke: "#f6f4fe", strokeWidth: 2 } }}
                        />
                        <VictoryAxis
                            label="Días"
                            style={{
                                axisLabel: { padding: 30 }
                            }}
                        />
                        <VictoryAxis dependentAxis
                            label="Cantidad"
                            style={{
                                axisLabel: { padding: 30 }
                            }}
                        />
                    </VictoryChart>
                </CardContent>
            </Card>

            {/* Tareas por duración */}
            <Card className='card-charts'>
                <CardContent>
                    <Typography variant="h4" gutterBottom textAlign={"center"}sx={{ color: '#7535cc' }}>Duración de las tareas </Typography>
                    <VictoryPie
                        colorScale={["tomato", "gold", "navy"]}
                        data={getTasksWithRange()}
                    />
                </CardContent>
            </Card>
        </div>
    );
}

export default ChartTask