import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from "../../task";
import { TaskService } from '../../task.service';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['todo-list.component.css']  
})
export class ToDoListComponent {

  @Input()
  list: Task[];

  @Output()
  clicked = new EventEmitter<any>();

  constructor(public readonly taskService: TaskService) {
    taskService.evento.subscribe(task => {
      this.clicked.emit(task); 
    });
  }

  exibeFinalizado(item: Task) {
    return !item.finalizado && item.iniciado;
  }

  exibeIniciado(item: Task) {
    return !item.finalizado && !item.iniciado;
  }

  exibeRetroceder(item: Task) {
    return item.finalizado && !item.iniciado;
  }

  exibeCancelar(item: Task) {
    return  !item.finalizado && item.iniciado;
  }

  delete(item: Task) {
    this.taskService.delete(item);
  }

}