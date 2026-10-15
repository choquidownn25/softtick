import { Component, OnInit, signal } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ToDo } from './todo';
import { TodoService } from 'src/app/services/apps/todo/todo.service';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AppDeleteDialogComponent } from '../kanban/delete-dialog/delete-dialog.component';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    imports: [
        MaterialModule,
        CommonModule,
        TablerIconsModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})

export class AppTodoComponent implements OnInit {
  sidePanelOpened = signal<boolean>(true);
  public showSidebar = signal<boolean>(false);
  inputFg: UntypedFormGroup;
  selectedCategory = signal<string>('all');
  todos = signal<ToDo[]>([]);
  searchText = signal<string | null>(null);
  editSave = signal<string>('Edit');

  totalTodos = signal<number>(0);
  totalCompleted = signal<number>(0);
  totalIncomplete = signal<number>(0);
  constructor(
    public fb: UntypedFormBuilder,
    public snackBar: MatSnackBar,
    public todoService: TodoService,
    private dialog: MatDialog
  ) {
    this.todos.set(this.todoService.getTodos());
  }

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }

  mobileSidebar(): void {
    this.showSidebar.set(!this.showSidebar);
  }

  ngOnInit(): void {
    this.inputFg = this.fb.group({
      mess: [],
    });
    const allTodos = this.todoService.getTodos();
    this.todos.set(allTodos);
    this.totalTodos.set(allTodos.length);
    this.totalCompleted.set(
      allTodos.filter((todo) => todo.completionStatus).length
    );
    this.totalIncomplete.set(
      allTodos.filter((todo) => !todo.completionStatus).length
    );
  }

  selectionlblClick(val: string): void {
    this.selectedCategory.set(val); // Update the selected category

    // Filter todos based on the selected category
    const filteredTodos = this.todoService.getTodos().filter((todo) => {
      if (val === 'all') return true;
      if (val === 'complete') return todo.completionStatus;
      if (val === 'uncomplete') return !todo.completionStatus;
      return true;
    });

    this.todos.set(filteredTodos); // Update the todos signal with filtered results
  }

  addTodo(): void {
    const message = this.inputFg.get('mess')?.value;
    if (message) {
      this.todoService.addTodo(message); // Call the service to add todo
      this.inputFg.reset(); // Reset the input field
      this.todos.set(this.todoService.getTodos());

      this.totalTodos.set(this.todos().length);
      this.totalCompleted.set(
        this.todos().filter((todo) => todo.completionStatus).length
      );
      this.totalIncomplete.set(
        this.todos().filter((todo) => !todo.completionStatus).length
      );
      this.openSnackBar('Todo successfully added!', 'Close');
    }
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  allTodos(): void {
    const completionStatus = (<HTMLInputElement>event!.target).checked;
    this.todos.update((todos) =>
      todos.map((todo) => ({ ...todo, completionStatus }))
    );
    this.updateCounts();
  }
  toggleTodoCompletion(todo: ToDo): void {
    // Toggle the completion status directly
    todo.completionStatus = !todo.completionStatus;
    // Update the counts
    this.updateCounts();
  }
  private updateCounts(): void {
    const allTodos = this.todos();
    this.totalTodos.set(allTodos.length);
    this.totalCompleted.set(
      allTodos.filter((todo) => todo.completionStatus).length
    );
    this.totalIncomplete.set(
      allTodos.filter((todo) => !todo.completionStatus).length
    );
  }

  editTodo(todo: ToDo): void {
    if (todo.edit) {
      this.todoService.editTodo(todo.id, todo.message);
      todo.edit = false;
      this.openSnackBar('Todo successfully edited!', 'Close');
      this.updateCounts();
    } else {
      todo.edit = true;
    }
  }

  deleteTodo(id: number): void {
    const dialogRef = this.dialog.open(AppDeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.todoService.deleteTodo(id);
        this.todos.set(this.todoService.getTodos());
        this.updateCounts();
        this.openSnackBar('Todo successfully deleted!', 'Close');
      }
    });
  }
  remainingList(): number {
    return this.todos().filter((todo) => !todo.completionStatus).length;
  }
}
