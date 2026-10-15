import { Component } from '@angular/core';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { AppKanbanDialogComponent } from './kanban-dialog.component';
import { AppOkDialogComponent } from './ok-dialog/ok-dialog.component';
import { AppDeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';
import { KanbanService } from 'src/app/services/apps/pages/apps/kanban/kanban.service';
import { Todos } from './kanban';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgScrollbarModule } from 'ngx-scrollbar';
// tslint:disable-next-line - Disables all

@Component({
    selector: 'app-kanban',
    templateUrl: './kanban.component.html',
    imports: [
        MaterialModule,
        CommonModule,
        TablerIconsModule,
        DragDropModule,
        NgScrollbarModule,
    ]
})
export class AppKanbanComponent {
  todos: Todos[] = [];
  inprogress: Todos[] = [];
  completed: Todos[] = [];
  onhold: Todos[] = [];

  constructor(
    public dialog: MatDialog,
    public taskService: KanbanService,
    private snackBar: MatSnackBar
  ) {
    this.loadTasks();
  }

  loadTasks(): void {

    this.serviceApiTodos();
    this.serviceApiInProgress();
    this.serviceApiCompleted();
    this.serviceApiOnHold();

  }
  serviceApiTodos() {
    //const allTasks = this.taskService.getAllTasks();
    this.taskService.getTodoTasks().subscribe(
      {
        next: (response) => {
          this.todos = response;
          console.log('todos', this.todos);
        },
        error: (error) => {
          console.error('Error fetching todos:', error);
        }
      }
    );
  }
  serviceApiInProgress() {
    this.taskService.getInProgressFromApi().subscribe(
      {
        next: (response) => {
          this.inprogress = response;
          console.log('inprogress', this.inprogress);
        },
        error: (error) => {
          console.error('Error fetching inprogress:', error);
        }
      }
    );
  }

  serviceApiCompleted() {
    this.taskService.getCompletedFromApi().subscribe(
      {
        next: (response) => {
          this.completed = response;
          console.log('completed', this.completed);
        },
        error: (error) => {
          console.error('Error fetching completed:', error);
        }
      }
    );
  }

  serviceApiOnHold() {
    this.taskService.getOnHoldFromApi().subscribe(
      {
        next: (response) => {
          this.onhold = response;
          console.log('onhold', this.onhold);
        },
        error: (error) => {
          console.error('Error fetching onhold:', error);
        }
      }
    );
  }
  drop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;

    const dialogRef = this.dialog.open(AppKanbanDialogComponent, {
      data: obj,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Add') {
        this.taskService.addTask(result.data);
        this.loadTasks();
        this.dialog.open(AppOkDialogComponent);
        this.showSnackbar('Task added successfully!');
      }
      if (result.event === 'Edit') {
        this.taskService.editTask(result.data);
        this.loadTasks();
      }
    });
  }

  deleteTask(t: Todos) {
    const del = this.dialog.open(AppDeleteDialogComponent);

    del.afterClosed().subscribe((result) => {
      if (result === 'true') {
        this.taskService.deleteTask(t.id);
        this.loadTasks();
        this.showSnackbar('Task deleted successfully!');
      }
    });
  }

  showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
  //taskProperty bgcolor
  getTaskClass(taskProperty: string | any): any {
    return taskProperty === 'Design'
      ? 'bg-success'
      : taskProperty === 'Mobile'
      ? 'bg-primary'
      : taskProperty === 'UX Stage'
      ? 'bg-warning'
      : taskProperty === 'Research'
      ? 'bg-error'
      : taskProperty === 'Data Science'
      ? 'bg-secondary'
      : taskProperty === 'Branding'
      ? 'bg-primary'
      : '';
  }
}
