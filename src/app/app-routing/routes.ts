import { Routes } from "@angular/router";
import { AddCardComponent } from "../cards/components/add-card/add-card.component";
import { CardDetailsComponent } from "../cards/components/card-details/card-details.component";
import { CardsListComponent } from "../cards/components/cards-list/cards-list.component";
import { EditCardComponent } from "../cards/components/edit-card/edit-card.component";
import { PageNotFoundComponent } from "../common-components/page-not-found/page-not-found.component";

export const routes: Routes = [
    { path: 'cards', component: CardsListComponent },
    { path: 'cards/add', component: AddCardComponent },
    { path: 'cards/:id', component: CardDetailsComponent },
    { path: 'cards/:id/edit', component: EditCardComponent },
    { path: '', redirectTo: '/cards', pathMatch: 'full' },
    { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];