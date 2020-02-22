import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { StoreService } from '../../store.service';
import { Task } from '../../task';

@Component({
  selector: 'tasks-iniciadas',
  templateUrl: './tasks-iniciadas.component.html'
})
export class TasksIniciadasComponent implements OnInit {

  iniciados$: Observable<Task[]>;

  constructor(private readonly store: StoreService) {}

  ngOnInit() {
    this.iniciados$ = this.store.getTodoList().pipe(map(
      todolist => todolist.filter(task => task.iniciado && !task.finalizado)
    ));   

  }
}