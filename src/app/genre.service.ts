import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Genre } from './app.component';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  constructor(private http: HttpClient) { }

  getGenres() {
    return this.http.get<Genre[]>('http://localhost:3000/genres').pipe(map(result => {
      return result;
    }));
  }
}
