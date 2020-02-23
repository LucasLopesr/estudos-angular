import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Task } from './task';
import { StoreService } from './store.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class TasksService {

  constructor(private http: HttpClient, private readonly store: StoreService) { }
 
  /*
    tap sendo utilizando para atribuir os valores para a store
  */
  getTodoList$: Observable<Task[]> = this.http
    .get<Task[]>(environment.apiEndPoint)
    .pipe(tap(next => this.store.set('todolist', next)));

  changeTask(taskChanged: Task) {
      this.http.put(`${environment.apiEndPoint}/${taskChanged.id}`, taskChanged).subscribe(() => {
        const value = this.store.valor.todolist;
        const todolist = value.map((task: Task) => {
          if (taskChanged.id === task.id) {
            return {... task, ... taskChanged};
          } else {
            return task;
          }
        });
      this.store.set('todolist', todolist);
    });
  }
  
  newTask(nome: String) {
    this.http.post(environment.apiEndPoint, {id:null , nome, finalizado: false, iniciado: false }).subscribe((newTask:Task) => {
      const value = this.store.valor.todolist;
      value.push(newTask);
    this.store.set('todolist', value);
    });
  }

  delete(task: Task) {
    console.log(task);
    
    this.http.delete(`${environment.apiEndPoint}/${task.id}`).subscribe(() => {
      const value = this.store.valor.todolist;
      const index = value.indexOf(task);
      if (index > -1) {
        value.splice(index, 1);
        this.store.set('todolist', value);
      }
      
    });
  }


  /* 
      {
      "id": 8,
      "nome": "Correr no parque",
      "finalizado": false,
      "iniciado": false
    }
  */

  /* getToDoList(): Observable<Task[]> {
    return this.http
      .get<Task[]>('http://localhost:3000/todolist');
  } */
}