import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
    selector: 'app-ok-dialog',
    templateUrl: './ok-dialog.component.html',
    imports: [MatDialogModule, MatButtonModule]
})
export class AppOkDialogComponent {
  constructor() {}
}
