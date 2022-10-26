import create from 'zustand'


export interface IEditStore{
   editId: number; 
   setEditId: (t: number) => void;
}

export const useEditStore = create<IEditStore>()((set) => ({
   editId: 0,
   setEditId: (t) => set({editId: t}),
})) 
