import create from 'zustand'


export interface IActiveStore{
   activeId: number;
   setActiveId: (id: number) => void;
}


export const useActiveStore = create<IActiveStore>()((set) => ({
   activeId: 0,
   setActiveId: (id) => set({activeId: id})
})) 

