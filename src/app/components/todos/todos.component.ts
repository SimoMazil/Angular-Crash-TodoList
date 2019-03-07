import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service'
import { Todo } from '../../models/Todo'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[]

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    // Get Todo items from server
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos
    })
  }

  deleteTodo(targetTodo: Todo) {
    // Remove from UI
    this.todos = this.todos.filter(todo => todo.id !== targetTodo.id)

    // Remove from server
    this.todoService.deleteTodo(targetTodo).subscribe()
  }

  addTodo(todo: Todo) {
    this.todoService.addTodo(todo).subscribe(todo => {
      this.todos.push(todo)
    })
  }

}
