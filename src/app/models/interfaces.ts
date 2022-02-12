export interface Task {
  userId?: number ,
  id: number,
  title: string,
  completed: boolean
};

export type PartTask = Pick<Task, 'id'| 'title' >;

export interface TasksState {
  all: Task[],
  find: Task[],
  filtered: Task[],
};

export type FormData = {
  [key: string]: string;
};
