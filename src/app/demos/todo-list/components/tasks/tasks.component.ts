import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StoreService } from '../../store.service';
import { Task } from '../../task';
import { TasksService } from '../../todo.service';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit {

  todolist$: Observable<Task[]>
  
  constructor(private readonly tasksService: TasksService,private readonly store: StoreService) {}

  ngOnInit() {
    this.todolist$ = this.store.getTodoList().pipe(map(
      todolist =>  todolist.filter(task => !task.iniciado && !task.finalizado)  
    ));    
  }

  onClicked(task: any) {
    this.tasksService.changeTask(task);
  }
}