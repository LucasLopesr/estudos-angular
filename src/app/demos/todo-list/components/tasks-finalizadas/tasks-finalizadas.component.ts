import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StoreService } from '../../store.service';
import { Task } from '../../task';

@Component({
  selector: 'tasks-finalizadas',
  templateUrl: './tasks-finalizadas.component.html'
})
export class TasksFinalizadasComponent implements OnInit {

  finalizados$: Observable<Task[]>;

  constructor(private readonly store: StoreService) { }

  ngOnInit() {
    this.finalizados$ = this.store.getTodoList().pipe(map(
      todolist => todolist.filter(task => task.finalizado)
    ));    
  }
}