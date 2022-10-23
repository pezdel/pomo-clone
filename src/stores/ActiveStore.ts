import create from 'zustand'


export interface IActiveStore{
   activeId: number; 
   setActiveId: (n: number) => void;
}

export const useActiveStore = create<IActiveStore>()((set) => ({
   activeId: 0,
   setActiveId: (n) => set({activeId: n}),
})) 

