import { TaskItem } from "./types"


export const sampleList: TaskItem[] = [
]

export const activeDefault = {
   id: -1,
   min: 10, 
   sec: 0, 
   count: 1,
   complete: false,
   name: "", 
}

export const shortDefault = {
   id: -1,
   min: 5,
   sec: 0,
   count: 1,
   complete: false,
   name: "Short Break",
};
export const longDefault = {
   id: -1,
   min: 15,
   count: 1,
   complete: false,
   sec: 0,
   name: "Long Break",
};

export const editDefault = {
   id: -1,
   name: "What are you doing?",
   count: { current: 0, total: 1 },
   time: { current: { min: 30, sec: 0 }, total: { min: 30, sec: 0 } },
   complete: false,
   fresh: true,
};

