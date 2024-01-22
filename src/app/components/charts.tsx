'use client'

import * as React from 'react';
import { VictoryChart, VictoryBar, VictoryAxis } from 'victory';
import { dateFunction } from '../functions/dateFunctions';

interface ChartTaskProps {
    taskList: any
  }

function ChartTask({ taskList }: ChartTaskProps) {
    // const [taskList, setTaskList] = React.useState<string[]>([])
    

    const getTaskComplete = () => {
        let qantity = 0
        let taksFinished:any [] = []
        {
            taskList.map((row: any) => {
                if (row.status == "complete"){
                    qantity++
                    taksFinished.push(row)
                }  
                })
        }
        return taksFinished
    }
    

    React.useEffect(()=>{
        console.log(getTaskinDays())
      }, [])

// Obtener días de la semana que pasó
    const getWeek = () => {
        let week:any [] = []
        for (var i = 0; i <= 6; i++) {
            const formattedDate = dateFunction(i)
            week.push(formattedDate)
          }
          console.log(week)
        return week
    }

    const getTaskinDays = () => {
        let tasks = getTaskComplete();
        let week = getWeek();
        let dayTask:any [] = []
        week.forEach(day => {
            let counter = 0;
            tasks.forEach(task => {
                
                if(day == task.lastUpdate){
                    // console.log('titi', day)
                    counter++
                }
            });
            dayTask.push({dayWeek: day, count: counter})
        });

        return dayTask
    }

    const averageTime = () => {
        let tasks = getTaskComplete();
        let taskLength = tasks.length
        let totalTime = 0
        tasks.map((task: any) => {
            let difTimes = task.estimatedTime - task.realTime
            totalTime += difTimes
        })
        return totalTime / taskLength
    }

    return (
        <div >
            <h1>Tareas finalizadas: {getTaskComplete().length}</h1>
            <h1>Promedio: {averageTime()}</h1>
            <VictoryChart width={400}
                domainPadding={{ x: 0 }}
            >
                <VictoryBar
                    data={getTaskinDays()}
                    x="dayWeek"
                    y="count"
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
        </div>
    );
}

export default ChartTask