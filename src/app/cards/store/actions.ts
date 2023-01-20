import { createAction, props } from "@ngrx/store";
import { Page } from "src/app/types/page.interface";
import { Card } from "../types/card.model";

export const getCard = createAction(
    '[Card] Get Card',
    props<{ id: number }>()
)

export const getCardSuccess = createAction(
    '[Card] Get Card Success',
    props<{ card: Card }>()
)

export const getCards = createAction(
    '[Card] Get Cards',
    props<{ pageNumber: number }>()
)

export const getCardsSuccess = createAction(
    '[Card] Get Cards Success',
    props<{ page: Page<Card> }>()
)

export const createCard = createAction(
    '[Card] Create Card',
    props<{ card: Card }>()
)

export const createCardSuccess = createAction(
    '[Card] Create Card Success',
    props<{ card: Card }>()
)

export const updateCard = createAction(
    '[Card] Update Card',
    props<{ card: Card }>()
)

export const updateCardSuccess = createAction(
    '[Card] Update Card Success',
    props<{ card: Card }>()
)

export const deleteCard = createAction(
    '[Card] Delete Card',
    props<{ id: number }>()
)

export const deleteCardSuccess = createAction(
    '[Card] Delete Card Success',
)

export const cardNotFound = createAction(
    '[Card] Card Not Found'
)

export const requestFailure = createAction(
    '[Card] Request Failure',
    props<{ error: string }>()
)

export const resetCardState = createAction(
    '[Card] Reset Card State'
)

export const exportCardReport = createAction(
    '[Card] Export Card Report',
    props<{ id: number }>()
)

export const exportCardReportSuccess = createAction(
    '[Card] Export Card Report Success'
)
