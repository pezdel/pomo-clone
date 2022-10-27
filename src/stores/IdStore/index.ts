import create from 'zustand'


export interface IdStore{
   id: number; 
   setId: () => void;
}

export const useIdStore = create<IdStore>()((set) => ({
   id: 0,
   setId: () => set(state => ({id: state.id + 1})),
})) 

