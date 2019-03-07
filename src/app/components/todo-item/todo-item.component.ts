import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TodoService } from '../../services/todo.service'
import { Todo } from '../../models/Todo'

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter()

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  setClasses() {
    const classes = {
      todo: true,
      'is-completed': this.todo.completed
    }

    return classes
  }

  onToggle(todo) {
    // Toggle todo in UI
    todo.completed = !todo.completed

    // Toggle todo in server
    this.todoService.toggleCompleted(todo).subscribe()
  }

  onDelete(todo) {
    // Emit the delete function to the parent component
    this.deleteTodo.emit(todo)
  }

}
