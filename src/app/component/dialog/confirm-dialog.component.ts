import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogTitle,
  MatDialogContent
} from '@angular/material/dialog';
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent
  ],
  template: `
    <h1 mat-dialog-title>确认删除</h1>
    <div mat-dialog-content>
      <p>您确定要删除吗？</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">否</button>
      <button mat-button color="warn" (click)="onConfirm()">是</button>
    </div>
  `
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
