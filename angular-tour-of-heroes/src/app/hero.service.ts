import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';



@Injectable({
  providedIn: 'root'
})
export class HeroService {



  // URL to web api.
  //private heroesUrl = 'api/heroes';
  //private heroesUrl = 'https://localhost:44339/api/heroes';
  private heroesUrl = 'http://localhost:26952/api/heroes';
  //private heroesUrl = 'localhost:26952/api/heroes';



  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }



  // getHeroes(): Observable<Hero[]> {
  //  const heroes = of(HEROES);
  //  this.messageService.add('HeroService: fetched heroes');
  //  return heroes;
  // }

  /** GET heroes from the server. */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }



  getHero(id: number): Observable<Hero> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const hero = HEROES.find(h => h.id === id) as Hero;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }



  /** Log a HeroService message with the MessageService. */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }



  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed.
   * @param result - optional value to return as the observable result.
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: Send the error to remote logging infrastructure.
      // (Log to console instead.)
      console.error(error);

      // TODO: Better job of transforming error for user consumption.
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);

    };
  }



}
