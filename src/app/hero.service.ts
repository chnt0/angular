import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Global} from './global';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  public url: string;
  private heroesUrl = 'api/heroes';  // URL to web api
  public newHero:Hero;


  constructor(private messageService:MessageService, private _http:HttpClient) { 
    this.url=Global.url;
  }

getHeroes(): Observable<Hero[]> {
  console.log('este es mi texto');
  console.log(this._http.get('http://localhost:8080/all'));
  return this._http.get<Hero[]>('http://localhost:8080/all');
}

getHero(id: number): Observable<Hero> {
  // TODO: send the message _after_ fetching the hero
  this.messageService.add(`HeroService: fetched hero id=${id}`);
 // return of(HEROES.find(hero => hero.id === id));ç
  return this._http.get<Hero>(`http://localhost:8080/select/${id}`);
}

private log(message: string) {
  this.messageService.add(`HeroService: ${message}`);
}
updateHero(hero: Hero): Observable<any> {
  return this._http.put(`http://localhost:8080/heroes/${hero.id}`,hero);
}

/** POST: add a new hero to the server */
addHero(hero: Hero): Observable<Hero> {
  return this._http.post<Hero>(`http://localhost:8080/heroes`, hero);
}

deleteHero(hero: Hero | number): Observable<Hero> {
  const id = typeof hero === 'number' ? hero : hero.id;
  const url = `${this.heroesUrl}/${id}`;

  return this._http.delete<Hero>(`http://localhost:8080/heroes/${id}`);
}

}
