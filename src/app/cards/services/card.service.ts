import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { BASE_URL } from 'src/app/shared/base-url';
import { Page } from 'src/app/types/page.interface';
import { Card } from '../types/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  getCard(id: number): Observable<Card> {
    return this.http.get<Card>(`${BASE_URL}/cards/${id}`)
      .pipe(delay(500))
  }

  getCards(pageNumber: number): Observable<Page<Card>> {
    if (pageNumber > 0) {
      pageNumber--;
    }
    return this.http.get<Page<Card>>(`${BASE_URL}/cards/page/${pageNumber}`)
      .pipe(delay(500))
  }

  craateCard(card: Card): Observable<Card> {
    return this.http.post<Card>(`${BASE_URL}/cards/add`, card)
      .pipe(delay(500))
  }

  updateCard(card: Card): Observable<Card> {
    return this.http.put<Card>(`${BASE_URL}/cards/edit`, card)
      .pipe(delay(500))
  }

  deleteCard(id: number): Observable<any> {
    return this.http.delete<any>(`${BASE_URL}/cards/${id}/delete`)
      .pipe(delay(500))
  }

  printPDF(id: number): Observable<Blob> {
    return this.http.get(`${BASE_URL}/cards/${id}/export`, { 
      responseType: 'blob'
    })
  }

  constructor(private http: HttpClient) { }
}
