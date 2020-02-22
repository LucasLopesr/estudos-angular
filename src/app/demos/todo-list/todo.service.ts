import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Task } from './task';
import { StoreService } from './store.service';

@Injectable()
export class TasksService {

  constructor(private http: HttpClient, private readonly store: StoreService) { }
 
  /*
    tap sendo utilizando para atribuir os valores para a store
  */
  getTodoList$: Observable<Task[]> = this.http
    .get<Task[]>('http://localhost:3000/todolist')
    .pipe(tap(next => this.store.set('todolist', next)));

  /* getToDoList(): Observable<Task[]> {
    return this.http
      .get<Task[]>('http://localhost:3000/todolist');
  } */
}