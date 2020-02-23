import { Injectable } from '@angular/core';
import { Task } from './task';
import { Subject } from 'rxjs';
import { TasksService } from './todo.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  subject$: Subject<Task> = new Subject();

  get evento() { return this.subject$.asObservable(); }

  constructor(private readonly tasksService: TasksService) { }

  finalizar(task: Task) {
    task.finalizado = true;
    task.iniciado = false;
    this.next(task);
  }

  cancelar(task: Task)  {
    task.iniciado = false;
    task.finalizado = false;
    this.next(task);
  }

  retroceder(task: Task)  {
    task.iniciado = true;
    task.finalizado = false;
    this.next(task);
  }

  iniciar(task: Task)  {
    task.finalizado = false;
    task.iniciado = true;
    this.next(task);
  }

  delete(item: Task) {
    this.tasksService.delete(item);
  }

  private next(task: Task) {
    this.subject$.next(task);
  }
}
