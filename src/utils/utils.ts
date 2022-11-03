import { SettingsColors, SubTask } from "./types";



export const activeDefault = {
   id: -1,
   min: 10, 
   sec: 0, 
   count: 1,
   complete: false,
   name: "", 
}
export const defaultTask ={
   id: -1,
   min: 30,
   sec: 0,
   count: 1,
   name: "",
   complete: false,
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


export const editDefault: SubTask = {
   id: -1,
   min: 10, 
   sec: 0,
   count: 1, 
   name: "What are you doing?",
   complete: false
}

export const settingsColors: SettingsColors = {
   red: "#dd6662",
   teal: "#5e9ca0",
   blue: "#5889ac",
}

