import { Injectable, signal } from '@angular/core';
import { ToDo } from 'src/app/pages/apps/todo/todo';
import { todos } from 'src/app/pages/apps/todo/todoData';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos = signal<ToDo[]>(todos);

  public getTodos(): ToDo[] {
    return this.todos();
  }

  public addTodo(message: string): void {
    if (message.trim().length === 0) {
      return;
    }

    // Get the current list of todos to find the maximum ID
    const currentTodos = this.todos(); // Get current todos from the signal
    const maxId =
      currentTodos.length > 0
        ? Math.max(...currentTodos.map((todo) => todo.id))
        : 0;

    const newTodo: ToDo = {
      id: maxId + 1, // Set new ID as max ID + 1
      message,
      completionStatus: false,
      edit: false,
      date: new Date(),
    };

    this.todos.update((todos) => [newTodo, ...todos]);
  }

  public deleteTodo(id: number): void {
    this.todos.update((todos) => todos.filter((todo) => todo.id !== id));
  }

  public editTodo(id: number, message: string): void {
    this.todos.update((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, message, edit: false } : todo
      )
    );
  }


}
