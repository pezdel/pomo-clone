import create from 'zustand'


export interface IIdStore{
   id: number; 
   setId: () => void;
}

export const useIdStore = create<IIdStore>()((set) => ({
   id: 0,
   setId: () => set(state => ({id: state.id + 1})),
})) 

