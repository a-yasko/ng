import { Component, OnInit } from '@angular/core';
import { GenreService } from './genre.service';
import { BookService } from './book.service';
import { delay } from 'rxjs/operators';

export interface Book {
  name: string;
  author: string;
  date: number;
  genre: Array<Genre>,
  genreId: number,
  description?: string;
  id?: number;
}

export interface Genre {
  id?: number;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../../node_modules/bootstrap/scss/bootstrap.scss', './app.component.scss']
})

export class AppComponent implements OnInit {
  genres: Genre[] = [];
  books: Book[] = [];
  loading: boolean = false;

  constructor(
    private genreService: GenreService,
    private bookService: BookService
    ) {}

  ngOnInit() {
    this.fetchBooks();
  }

  fetchBooks() {
    this.loading = true;
    this.bookService.getBooks(1)
      .pipe(delay(300))
      .subscribe(result => {
        this.books = result;
        this.loading = false;
      });

    this.genreService.getGenres()
      .pipe(delay(300))
      .subscribe(result => {
        this.genres = result;
        for (let book of this.books) {
          book.genre.push(this.genres[book.genreId - 1]);
        }
      });
  }

  updateBooks(book: Book) {
    book.genre.push(this.genres[book.genreId - 1]);
    this.books.push(book);
  }

  removeBook(id: number) {
    this.bookService.deleteBook(id)
      .subscribe(() => {
        this.books = this.books.filter(b => b.id !== id);
      })
  }
}
