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
   running?: boolean;
   finished?: boolean;
}


export interface IncDec {
  inc: () => void;
  dec: () => void;
  val: number
}
