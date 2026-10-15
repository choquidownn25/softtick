
import { Component, Inject, Optional } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { DatePipe } from '@angular/common';
@Component({
    selector: 'app-kanban-dialog',
    templateUrl: './kanban-dialog.component.html',
    imports: [
    MaterialModule,
    TablerIconsModule,
    FormsModule,
    ReactiveFormsModule
],
    providers: [DatePipe]
})
export class AppKanbanDialogComponent {
  action: string;
  local_data: any;

  constructor(
    public dialogRef: MatDialogRef<AppKanbanDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe: DatePipe
  ) {
    this.local_data = { ...data };

    if (data.action === 'Add') {
      this.local_data.date = this.datePipe.transform(new Date(), 'd MMMM')!;
      this.local_data.taskProperty = 'Design';
      this.local_data.imageUrl = '/assets/images/taskboard/kanban-img-1.jpg';
    } else if (data.action === 'Edit') {
      this.local_data.imageUrl = data.imageUrl;
    }

    this.action = this.local_data.action;
  }

  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
