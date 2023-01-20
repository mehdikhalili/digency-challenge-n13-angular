import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CardService } from "../services/card.service";
import * as CardActions from "./actions";
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class cardEffects {

  getCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CardActions.getCard),
      mergeMap((action) => {
        return this.cardService.getCard(action.id).pipe(
          map((card) => CardActions.getCardSuccess({ card })),
          catchError((error) => {
            if (error.status === 404) {
              return of(CardActions.cardNotFound())
            } else {
              return of(CardActions.requestFailure({ error: error.message }))
            }
          })
        );
      })
    )
  );

  getCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CardActions.getCards),
      mergeMap((action) => {
        return this.cardService.getCards(action.pageNumber).pipe(
          map((page) => CardActions.getCardsSuccess({ page })),
          catchError((error) => of(CardActions.requestFailure({ error })))
        )
      })
    )
  )

  createCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CardActions.createCard),
      mergeMap((action) => {
        return this.cardService.craateCard(action.card).pipe(
          map((card) => CardActions.createCardSuccess({ card })),
          catchError((error) => {
            if (error.status === 404) {
              return of(CardActions.cardNotFound())
            } else {
              return of(CardActions.requestFailure({ error: error.message }))
            }
          })
        )
      })
    )
  )

  upateCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CardActions.updateCard),
      mergeMap((action) => {
        return this.cardService.updateCard(action.card).pipe(
          map((card) => CardActions.updateCardSuccess({ card })),
          catchError((error) => of(CardActions.requestFailure({ error })))
        )
      })
    )
  )

  deleteCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CardActions.deleteCard),
      mergeMap((action) => {
        return this.cardService.deleteCard(action.id).pipe(
          map(() => CardActions.deleteCardSuccess()),
          catchError((error) => {
            if (error.status === 404) {
              return of(CardActions.cardNotFound())
            } else {
              return of(CardActions.requestFailure({ error }))
            }
          })
        )
      })
    )
  )

  exportCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CardActions.exportCardReport),
      mergeMap((action) => {
        return this.cardService.printPDF(action.id).pipe(
          map(() => CardActions.exportCardReportSuccess()),
          catchError((error) => {
            if (error.status === 0) {
              return of(CardActions.exportCardReportSuccess())
            } else {
              return of(CardActions.requestFailure({ error: error.message }))
            }
          })
        )
      })
    )
  )

  constructor(private actions$: Actions, private cardService: CardService) {}
}