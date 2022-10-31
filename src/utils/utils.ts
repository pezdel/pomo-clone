import { TaskItem } from "./types"


export const sampleList: TaskItem[] = [
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
   time: {current: {min: 1, sec: 0}, total: {min: 1, sec: 0}},
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



