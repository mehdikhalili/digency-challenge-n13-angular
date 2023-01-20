import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/types/page.interface';
import { Card } from '../../types/card.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/types/app-state.interface';
import { MatDialog } from '@angular/material/dialog';
import { exportCardReport, getCards, resetCardState } from '../../store/actions';
import { cardsPageSelector, errorSelector, isExportingSelector, isLoadingSelector } from '../../store/selectors';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.css']
})
export class CardsListComponent implements OnInit {

  page: Page<Card> | null = null;
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.refreshCards()

    this.store.select(cardsPageSelector)
      .subscribe(page => {this.page = page; console.log(this.page)})

    this.store.select(isLoadingSelector)
      .subscribe(isLoading => this.isLoading = isLoading)

    this.store.select(errorSelector)
      .subscribe(error => this.error = error)
  }

  refreshCards(pageNumber: number = 0): void {
    this.store.dispatch(getCards({ pageNumber }))
  }

  onPageChange(pageNumber: number) {
    this.refreshCards(pageNumber)
  }
  
  onPrint(id?: number) {
    if (id) {
      this.store.dispatch(exportCardReport({ id }))
    }
  }

  openDeleteDialog(card: Card): void {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: card
    })

    dialogRef.afterClosed().subscribe({
      next: isDeleted => {
        if (isDeleted) {
          this.refreshCards()
        }
      }
    })
  }

}
