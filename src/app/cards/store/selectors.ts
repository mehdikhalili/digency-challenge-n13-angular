import { AppState } from "src/app/types/app-state.interface";
import { createSelector } from "@ngrx/store";

const selectFeature = (state: AppState) => state.cards;

export const cardsPageSelector = createSelector(
  selectFeature,
  (state) => state.page
);

export const selectedCardSelector = createSelector(
  selectFeature,
  (state) => state.selectedCard
);

export const isLoadingSelector = createSelector(
  selectFeature,
  (state) => state.isLoading
)

export const isSavedSelector = createSelector(
  selectFeature,
  (state) => state.isSaved
)

export const isDeletingSelector = createSelector(
  selectFeature,
  (state) => state.isDeleting
)

export const isDeletedSelector = createSelector(
  selectFeature,
  (state) => state.isDeleted
)

export const notFoundSelector = createSelector(
  selectFeature,
  (state) => state.notFound
)

export const errorSelector = createSelector(
  selectFeature,
  (state) => state.error
);

export const isExportingSelector = createSelector(
  selectFeature,
  (state) => state.isExporting
);