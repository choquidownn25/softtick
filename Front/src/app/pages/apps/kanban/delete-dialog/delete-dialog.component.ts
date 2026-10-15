import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
    selector: 'app-delete-dialog',
    templateUrl: './delete-dialog.component.html',
    imports: [MatDialogModule, MatButtonModule]
})
export class AppDeleteDialogComponent {
  constructor() {}
}
