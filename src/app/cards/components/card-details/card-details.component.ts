import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AppState } from 'src/app/types/app-state.interface';
import { Card } from '../../types/card.model';
import { Store } from '@ngrx/store';
import * as CardActions from '../../store/actions'
import { isExportingSelector, isLoadingSelector, notFoundSelector, selectedCardSelector } from '../../store/selectors';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {

  card: Card | null = null;
  notFound: boolean = false;
  isLoading: boolean = false;
  isExporting: boolean = false;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private service: CardService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => 
      this.store.dispatch(CardActions.getCard({ id: params['id'] }))
    )

    this.store.select(selectedCardSelector)
      .subscribe(card => this.card = card)

    this.store.select(notFoundSelector)
      .subscribe(notFound => this.notFound = notFound)
      
    this.store.select(isLoadingSelector)
      .subscribe(isLoading => this.isLoading = isLoading)
    
    this.store.select(isExportingSelector)
      .subscribe(isExporting => this.isExporting = isExporting)
  }

  onPrint() {
    if (this.card?.id) {
      this.store.dispatch(CardActions.exportCardReport({ id: this.card.id }))
    }
  }

}
