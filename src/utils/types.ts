export interface TimeItem {
   min: number;
   sec: number;
}

export interface TaskItem {
   id: number;
   name: string;
   time: {current: TimeItem, total: TimeItem};
   count: {current: number, total: number};
   complete: boolean;
   fresh: boolean;
}


export interface IncDec {
  inc: () => void;
  dec: () => void;
  val: number
}

export interface SubTask {
   min: number;
   sec: number
   count: number;
   name: string;
   id: number;
   complete: boolean;
}
