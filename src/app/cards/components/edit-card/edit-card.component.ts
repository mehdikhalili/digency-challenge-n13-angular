import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppState } from 'src/app/types/app-state.interface';
import { Card } from '../../types/card.model';
import { Store } from '@ngrx/store';
import { createCard, getCard, resetCardState, updateCard } from '../../store/actions';
import { errorSelector, isLoadingSelector, isSavedSelector, notFoundSelector, selectedCardSelector } from '../../store/selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.css']
})
export class EditCardComponent implements OnInit {

  card: Card | null = null;
  notFound: boolean = false;
  isLoading: boolean = false;
  error: string | null = null;
  isSaved?: Observable<boolean> = this.store.select(isSavedSelector)

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => 
      this.store.dispatch(getCard({ id: params['id'] }))
    )

    this.store.select(errorSelector)
      .subscribe(error => this.error = error)

    this.store.select(selectedCardSelector)
      .subscribe(card => this.card = card)

    this.store.select(notFoundSelector)
      .subscribe(notFound => this.notFound = notFound)

    this.store.select(isLoadingSelector)
      .subscribe(isLoading => this.isLoading = isLoading)

    this.isSaved?.subscribe(isSaved => {
      if (isSaved && this.card) {
        this.router.navigate([`/cards/${this.card.id}`])
        this.store.dispatch(resetCardState())
      }
    })
  }

  save(data: Card): void {
    data.id = this.card?.id
    this.store.dispatch(updateCard({ card: data }))
  }

}
