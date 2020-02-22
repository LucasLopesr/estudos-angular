import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from "../../task";

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

  exibeFinalizado(item: Task) {
    return !item.finalizado && item.iniciado;
  }

  exibeIniciado(item: Task) {
    return !item.finalizado && !item.iniciado;
  }

  exibeRetroceder(item: Task) {
    return (item.finalizado && !item.iniciado) || (!item.finalizado && item.iniciado);
  }

}