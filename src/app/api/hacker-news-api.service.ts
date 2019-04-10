import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HackerNewsApiService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'https://node-hnapi.herokuapp.com';
  }

  // fetchStories(): Observable<any> {
  //   return this
  //     .httpClient
  //     .get(`${this.baseUrl}/topstories.json`)
  //     .pipe(
  //       tap(_ => console.log(_)),
  //       catchError(this.handleError<any>('getHeroes', []))
  //     );
  // }
  //
  // fetchItem(id: number): Observable<any> {
  //   return this.httpClient.get(`${this.baseUrl}/item/${id}.json`);
  // }

  fetchStories(storyType: string, page: number): Observable<any> {
    return this
      .httpClient
      .get(`${this.baseUrl}/${storyType}?page=${page}`)
      .pipe(
        tap(source => console.log(source)),
        catchError(this.handleError<any>('fetchStories', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }

}
