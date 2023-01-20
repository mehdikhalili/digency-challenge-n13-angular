import { Component, OnInit } from '@angular/core';
import { Card } from '../../types/card.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/types/app-state.interface';
import { errorSelector, isSavedSelector, selectedCardSelector } from '../../store/selectors';
import { createCard, resetCardState } from '../../store/actions';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {

  error: string | null = null;
  isSaved?: Observable<boolean> = this.store.select(isSavedSelector);
  selectedCard: Card | null = null;

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.store.select(errorSelector)
      .subscribe(error => this.error = error)

    this.store.select(selectedCardSelector)
      .subscribe(card => this.selectedCard = card)

    this.isSaved?.subscribe(isSaved => {
      if (isSaved && this.selectedCard) {
        this.router.navigate([`/cards/${this.selectedCard.id}`])
        this.store.dispatch(resetCardState())
      }
    })
  }

  save(data: Card): void {
    this.store.dispatch(createCard({ card: data }))
  }

}
