import { Component, OnDestroy } from '@angular/core';
import { TasksService } from './todo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo.component.html'
})
export class TodoComponent implements OnDestroy {
  subscription: Subscription;
  constructor(readonly taskService: TasksService) {
    this.subscription = taskService.getTodoList$.subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}