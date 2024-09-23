export interface Subtask {
    title: string;
    isCompleted: boolean;
  }
  
  export interface Task {
    title: string;
    description: string;
    subtasks: Subtask[];
    status: string; 
  }
  
  export interface Column {
    name: string;
    tasks: Task[];
  }
  
  export interface Board {
    name: string;
    isActive: boolean;
    id: string;
    columns: Column[];
  }
  
  export interface BoardState {
    boards: Board[];
  }