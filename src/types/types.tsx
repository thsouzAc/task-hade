export type Task = {
    id: string;
    content: string;
  };
  
  export type List = {
    id: string;
    title: string;
    tasks: Task[];
  };