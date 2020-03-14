import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TodoListType, TodoSortType } from '../../../models/todo.model';
import {  TodoConditions } from '../../../models/todo.model';
import { TodoService } from '../../../service/todo/todo.service';
@Component({
  selector: 'app-todo-inbox',
  templateUrl: './todo-inbox.component.html',
  styleUrls: ['./todo-inbox.component.scss'],
})
export class TodoInboxComponent implements OnInit {
  loader: boolean;
  todos: TodoListType;

  constructor(private toddService: TodoService) { }

  ngOnInit(): void {
    const conditions: TodoConditions = {
      sort: {
        updatedAt: 'DESC'
      },
      filter: {
        isCompleted: false
      }
    };
    this.toddService.listTodos(conditions)
      .subscribe((data) => {
        this.todos = data;
    });
  }

}