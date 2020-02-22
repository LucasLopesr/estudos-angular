import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { State, INITIAL_STATE } from './todo.store';
import { Task } from './task';

export class StoreService {
    private subject = new BehaviorSubject<State>(INITIAL_STATE)
    private store = this.subject.asObservable();

    public getTodoList(): Observable<Task[]> {
        return this.store.pipe(map(store => store.todolist));
    }

    get valor() {
        return this.subject.value;
    }

    set(name: string, state: unknown) {
        this.subject.next({
            ... this.valor, [name]: state
        })
    }
}