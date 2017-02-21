import { Component, OnInit } from '@angular/core';

import { ToDoService } from '../../groceries/to-do.service';
import { Todo } from '../../groceries/todo';

@Component({
  selector: 'app-to-do-app',
  templateUrl: './to-do-app.component.html',
  styleUrls: ['./to-do-app.component.css'],
  providers: [ToDoService]
})
export class ToDoAppComponent implements OnInit {

  newTodo: Todo = new Todo();

  constructor(private todoService: ToDoService) { }

  ngOnInit() {
  }

  addTodo() {
    this.todoService.addTodo(this.newTodo);
    this.newTodo = new Todo();
  }

  toggleTodoComplete(todo) {
    this.todoService.toggleTodoComplete(todo);
  }

  removeTodo(todo) {
    this.todoService.deleteTodoById(todo.id);
  }

  get todos() {
    return this.todoService.getAllTodos();
  }
}
