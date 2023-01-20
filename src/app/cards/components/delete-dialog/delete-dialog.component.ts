import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { isDeletedSelector, isDeletingSelector } from '../../store/selectors';
import { Card } from '../../types/card.model';
import { AppState } from 'src/app/types/app-state.interface';
import { deleteCard, resetCardState } from '../../store/actions';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  isDeleted?: Observable<boolean> = this.store.select(isDeletedSelector);
  isDeleting: boolean = false;

  constructor(private dialogRef: MatDialogRef<DeleteDialogComponent>,
            @Inject(MAT_DIALOG_DATA) public card: Card,
            private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(isDeletingSelector).subscribe(isDeleting => this.isDeleting = isDeleting)
  }

  onDelete() {
    if (this.card.id) {
      this.store.dispatch(deleteCard({ id: this.card.id }))
    }
    this.isDeleted?.subscribe(isDeleted => {
      if (isDeleted) {
        this.store.dispatch(resetCardState())
        this.dialogRef.close(isDeleted)
      }
    })
  }

}
