import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { forkJoin, map, Observable, tap } from 'rxjs';
import { KanbanTask, Todos } from 'src/app/kanban/kanban';

import {
  todos,
  inprogress,
  completed,
  onhold,
} from 'src/app/kanban/kanbanData';
import { RouteKanban } from 'src/app/route/kanban-route';
import { RouteServer } from 'src/app/route/route-server';

type BoardState = {
  todos: Todos[];
  inProgress: Todos[];
  completed: Todos[];
  onHold: Todos[];
}

@Injectable({
  providedIn: 'root',
})
export class KanbanService {
  ruta_api = RouteServer.API_ROUTE_URL;
  ruta_api_todos = this.ruta_api + RouteKanban.KANBAN_ROUTE_URL_TODO;
  ruta_api_in_progress = this.ruta_api + RouteKanban.KANBAN_ROUTE_URL_IN_PROGRESS;
  ruta_api_on_hold = this.ruta_api + RouteKanban.KANBAN_ROUTE_URL_ON_HOLD;
  ruta_api_completed = this.ruta_api + RouteKanban.KANBAN_ROUTE_URL_COMPLETED;
  ruta_api_create = this.ruta_api + RouteKanban.KANBAN_ROUTE_URL_CREATE;
  ruta_api_update = this.ruta_api + RouteKanban.KANBAN_ROUTE_URL_UPDATE;
  todos = signal<Todos[] | any>(todos);
  inProgress = signal<Todos[] | any>(inprogress);
  completed = signal<Todos[] | any>(completed);
  onHold = signal<Todos[] | any>(onhold);


  constructor(private http: HttpClient) {
  }

  //`${this.ruta_api_in_progress}`
  getInProgressFromApi(): Observable<Todos[]> {
    return this.http.get<Todos[]>(`${this.ruta_api_in_progress}`);
  }

  getTodoTasks(): Observable<Todos[]> {
    return this.http.get<Todos[]>(
      `${this.ruta_api_todos}`
    );
  }
  getOnHoldFromApi(): Observable<Todos[]> {
    return this.http.get<Todos[]>(`${this.ruta_api_on_hold}`);
  }
  getCompletedFromApi(): Observable<Todos[]> {
    return this.http.get<Todos[]>(`${this.ruta_api_completed}`);
  }
  addTaskCreate(task: Todos): Observable<Todos> {
    task.property = 'todos';
    return this.http.post<Todos>(`${this.ruta_api_create}`, task);
  }
  updateTaskUpdate(task: Todos): Observable<Todos> {
    return this.http.put<Todos>(`${this.ruta_api_update}`, task);
  }
  getAllTasks(): {
    todos: Todos[];
    inProgress: Todos[];
    completed: Todos[];
    onHold: Todos[];
  } {
    return {
      todos: this.todos(),
      inProgress: this.inProgress(),
      completed: this.completed(),
      onHold: this.onHold(),
    };
  }


findAllTasks(): Observable<{
  todos: Todos[];
  inProgress: Todos[];
  completed: Todos[];
  onHold: Todos[];
}> {
  return forkJoin({
    todos: this.getTodoTasks(),               // wrap sync array with `of`
    inProgress: this.getInProgressFromApi(),      // Observable<Todos[]>
    completed: this.getCompletedFromApi(),        // Observable<Todos[]>
    onHold: this.getOnHoldFromApi(),              // Observable<Todos[]>
  });
}



addTask(task: Todos): void {
  const currentTodos = this.todos();
  const newTask = {
    ...task,
    id: currentTodos.length
      ? currentTodos[currentTodos.length - 1].id + 1
      : 1, // Generate a new ID
  };
  this.todos.set([...currentTodos, newTask]);
}

editTask(updatedTask: Todos): void {
  const currentTodos = this.todos();
  const updatedTodos = currentTodos.map((task: { id: number }) =>
    task.id === updatedTask.id ? updatedTask : task
  );
  this.todos.set(updatedTodos);

  this.updateTaskInList(this.inProgress(), updatedTask);
  this.updateTaskInList(this.completed(), updatedTask);
  this.updateTaskInList(this.onHold(), updatedTask);
}

  private updateTaskInList(taskList: Todos[], updatedTask: Todos): void {
  const updatedList = taskList.map((task) =>
    task.id === updatedTask.id ? updatedTask : task
  );
  if(taskList === this.inProgress()) {
  this.inProgress.set(updatedList);
} else if (taskList === this.completed()) {
  this.completed.set(updatedList);
} else if (taskList === this.onHold()) {
  this.onHold.set(updatedList);
}
  }
deleteTask(taskId: number): void {
  this.todos.set(
    this.todos().filter((task: { id: number }) => task.id !== taskId)
  );
  this.inProgress.set(
    this.inProgress().filter((task: { id: number }) => task.id !== taskId)
  );
  this.completed.set(
    this.completed().filter((task: { id: number }) => task.id !== taskId)
  );
  this.onHold.set(
    this.onHold().filter((task: { id: number }) => task.id !== taskId)
  );
}
}
