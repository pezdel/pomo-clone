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
