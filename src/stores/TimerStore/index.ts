import create from 'zustand'


export interface TimerStore {
   running: boolean; 
   setRunning: (b: boolean) => void;
}

export const useTimerStore = create<TimerStore>()((set) => ({
   running: false,
   setRunning: (b) => set({running: b})
})) 

