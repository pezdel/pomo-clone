import { TaskItem } from "./types"


export const sampleList: TaskItem[] = [
   // {id: 99, name: "clean", currCount: 0, count: 3, currTime: 30, time: 30, complete: false,  fresh: false},
   // {id: 98, name: "study", currCount: 0, count: 15, currTime: 45, time: 45, complete: false, fresh: false},
]


export const activeDefault = {
   id: -1,
   name: '',
   count: {current: 0, total: 1},
   time: {current: {min: 30, sec: 0}, total: {min: 30, sec: 0}},
   complete: false,
   fresh: true,
}

export const editDefault = {
   id: -1,
   name: 'What are you doing?',
   count: {current: 0, total: 1},
   time: {current: {min: 30, sec: 0}, total: {min: 30, sec: 0}},
   complete: false,
   fresh: true,
}

export const shortDefault = {
   id: -1,
   name: 'Short Break',
   count: {current: 0, total: 1},
   time: {current: {min: 5, sec: 0}, total: {min: 5, sec: 0}},
   complete: false,
   fresh: true,
}

export const longDefault = {
   id: -1,
   name: 'Long Break',
   count: {current: 0, total: 1},
   time: {current: {min: 15, sec: 0}, total: {min: 15, sec: 0}},
   complete: false,
   fresh: true,
}



