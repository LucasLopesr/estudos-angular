import { Task } from './task';

export interface State {
    todolist: Task[];
}

export const INITIAL_STATE: State = {
    todolist: []
};

