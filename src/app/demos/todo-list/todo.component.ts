import { Component, OnDestroy } from '@angular/core';
import { TasksService } from './todo.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnDestroy {
  subscription: Subscription;
  taskForm: FormGroup;
  constructor(readonly taskService: TasksService,private readonly tasksService: TasksService, private formBuilder: FormBuilder) {
    this.subscription = taskService.getTodoList$.subscribe();
    this.taskForm = this.formBuilder.group({
      'nome': new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    const nome: String = this.taskForm.get('nome').value;
    this.taskForm.reset();
    if (nome) {
      this.tasksService.newTask(nome);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}