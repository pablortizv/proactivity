import { createTask } from "../firebase/api";
import { dateFunction } from "./dateFunctions";


export const createFinishedTasks = async () => {
    for (var i = 1; i <= 50; i++) {
        let initialValues = {
            name: "",
            description: "",
            estimatedTime: 0,
            realTime:0,
            status:"complete",
            creationDate:"",
            lastUpdate: "",
            user:"amin"
        }
        let date = dateFunction(Math.floor(Math.random() * 7))
        let estimate = Math.floor(Math.random() * 7200)
        let real = Math.floor(estimate*(getRandomIntInclusive(80, 100)/100))
        initialValues.name = "Taks" + " " + i + " " + date
        initialValues.description = "Taks description" + " " + i + " " + date
        initialValues.creationDate = date
        initialValues.lastUpdate = date
        initialValues.estimatedTime = estimate;
        initialValues.realTime = real
        try {
            await createTask(initialValues);
          } catch (error) {
              console.log(error)
          }
      }
      return true
}

function getRandomIntInclusive(min : number, max : number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }