import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StoreService } from '../../store.service';
import { Task } from '../../task';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit {

  todolist$: Observable<Task[]>
  
  constructor(private readonly store: StoreService) {}

  ngOnInit() {
    this.todolist$ = this.store.getTodoList().pipe(map(
      todolist =>  todolist.filter(task => !task.iniciado && !task.finalizado)  
    ));    
  }
}