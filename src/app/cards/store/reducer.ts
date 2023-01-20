import { createReducer, on } from "@ngrx/store";
import { CardState } from "../types/card-state.interface";
import * as CardActions from "./actions";

const initialState: CardState = {
    page: null,
    selectedCard: null,
    notFound: false,
    isLoading: false,
    error: null,
    isSaved: false,
    isDeleting: false,
    isDeleted: false,
    isExporting: false,
};

export const CardReducer = createReducer(
    initialState,

    on(CardActions.getCards, (state) => ({...state, isLoading: true})),

    on(CardActions.getCardsSuccess, (state, action) => ({
        ...state,
        page: action.page,
        selectedCard: null,
        isLoading: false,
        error: null
    })),

    on(CardActions.getCard, (state) => ({...state, isLoading: true})),

    on(CardActions.getCardSuccess, (state, action) => ({
        ...state,
        page: null,
        selectedCard: action.card,
        isLoading: false,
        error: null
    })),

    on(CardActions.createCard, (state) => ({...state, isLoading: true})),

    on(CardActions.createCardSuccess, (state, action) => ({
        ...state,
        selectedCard: action.card,
        isSaved: true,
        isLoading: false,
        error: null
    })),

    on(CardActions.updateCard, (state) => ({...state, isLoading: true})),

    on(CardActions.updateCardSuccess, (state, action) => ({
        ...state,
        selectedCard: action.card,
        isSaved: true,
        isLoading: false,
        error: null
    })),

    on(CardActions.deleteCard, (state) => ({...state, isDeleting: true})),

    on(CardActions.deleteCardSuccess, (state) => ({
        ...state,
        isDeleting: false,
        isDeleted: true
    })),

    on(CardActions.cardNotFound, (state) => ({
        ...state,
        notFound: true,
        isLoading: false,
        isDeleting: false
    })),

    on(CardActions.requestFailure, (state, action) => ({
        ...state,
        error: action.error,
        isLoading: false,
        isDeleting: false
    })),

    on(CardActions.exportCardReport, (state) => ({ ...state, isExporting: true })),

    on(CardActions.exportCardReportSuccess, (state) => ({
        ...state,
        isExporting: false,
    })),

    on(CardActions.resetCardState, (state) => ({
        ...state,
        page: null,
        selectedCard: null,
        notFound: false,
        isLoading: false,
        error: null,
        isSaved: false,
        isDeleting: false,
        isDeleted: false,
        isExporting: false,
    })),
)