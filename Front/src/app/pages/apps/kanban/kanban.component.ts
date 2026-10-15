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

import { Todos } from './kanban';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { KanbanService } from 'src/app/services/apps/pages/apps/kanban/kanban.service';


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
    // If a combined observable of all tasks is available, subscribe and assign
    const allTasks$ = this.taskService.findAllTasks();
    if (allTasks$ && typeof (allTasks$ as any).subscribe === 'function') {
      (allTasks$ as any).subscribe(({ todos, inProgress, completed, onHold }: any) => {
        if (todos) { this.todos = todos; }
        if (inProgress) { this.inprogress = inProgress; }
        if (completed) { this.completed = completed; }
        if (onHold) { this.onhold = onHold; }
      }, (err: any) => {
        console.error('Error fetching all tasks:', err);
      });
    }
  }

  serviceApiTodos() {
    //const allTasks = this.taskService.getAllTasks();
    this.taskService.getTodoTasks().subscribe(
      {
        next: (response) => {
          this.todos = response;
          //console.log('todos', this.todos);
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
          //console.log('inprogress', this.inprogress);
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
          //console.log('completed', this.completed);
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
          //console.log('onhold', this.onhold);
        },
        error: (error) => {
          console.error('Error fetching onhold:', error);
        }
      }
    );
  }

  drop(event: CdkDragDrop<any[]>): void {
    console.log('\nDrop event.previousContainer.id:', event.previousContainer.id);
    console.log('\nDrop event.container.id:', event.container.id);
    // 0-1 : inprogress
    if(event.container.id === '0' &&  event.previousContainer.id){
      console.log("inprogres");
    }
    // 1-2 : onhold
    // 2-3 : complete
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
       
        this.dialog.open(AppOkDialogComponent);
        this.taskService.addTaskCreate(result.data).subscribe(
          {
            next: (response) => {
              console.log('Task added successfully:', response);
              this.loadTasks();
              this.showSnackbar('Task added successfully!');
            },
            error: (error) => {
              console.error('Error adding task:', error);
              this.showSnackbar('Error adding task!');
            }
          }
        );
      }
      if (result.event === 'Edit') {
        this.taskService.editTask(result.data);
        this.taskService.updateTaskUpdate(result.data).subscribe(
          {
            next: (response) => {
              console.log('Task updated successfully:', response);
              this.loadTasks();
              this.showSnackbar('Task updated successfully!');
            },
            error: (error) => {
              console.error('Error updating task:', error);
              this.showSnackbar('Error updating task!');
            }
          }
        );   
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
