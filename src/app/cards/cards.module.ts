import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsListComponent } from './components/cards-list/cards-list.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AddCardComponent } from './components/add-card/add-card.component';
import { CardFormComponent } from './components/forms/card-form/card-form.component';
import { CardReducer } from './store/reducer';
import { cardEffects } from './store/effects';
import { NgxPaginationModule } from 'ngx-pagination';
import { CardDetailsComponent } from './components/card-details/card-details.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { EditCardComponent } from './components/edit-card/edit-card.component';

@NgModule({
  declarations: [
    CardsListComponent,
    AddCardComponent,
    CardFormComponent,
    CardDetailsComponent,
    DeleteDialogComponent,
    EditCardComponent
  ],
  imports: [
    CommonComponentsModule,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    NgxPaginationModule,
    StoreModule.forFeature('cards', CardReducer),
    EffectsModule.forFeature([cardEffects])
  ]
})
export class CardsModule { }
