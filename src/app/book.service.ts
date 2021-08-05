import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from './app.component';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private http: HttpClient) { }

  getBooks(page: number) {
    return this.http.get<Book[]>(`http://localhost:3000/books?_page=${page}&_limit=10`)
      .pipe(map(result => {
        return result;
      }));
  }

  postBook(book: Book) {
    const body = {
      name: book.name,
      author: book.author,
      date: book.date,
      genre: [],
      genreId: book.genreId,
      description: book.description,
    };
    return this.http.post<Book>('http://localhost:3000/books', body)
      .subscribe(book => {
        console.log(book);
      })
  }

  deleteBook(id: number) {
    return this.http.delete<void>(`http://localhost:3000/books/${id}`);
  }
}
