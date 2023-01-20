import { Page } from "src/app/types/page.interface";
import { Card } from "./card.model";

export interface CardState {
    page: Page<Card> | null;
    selectedCard: Card | null;
    isLoading: boolean;
    notFound: boolean;
    error: string | null;
    isSaved: boolean;
    isDeleting: boolean;
    isDeleted: boolean;
    isExporting: boolean;
}