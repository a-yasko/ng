import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../app.component';
import { GenreService } from '../genre.service';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['../../../node_modules/bootstrap/scss/bootstrap.scss', './book-form.component.scss']
})
export class BookFormComponent implements OnInit {
  @Output() onAdd: EventEmitter<Book> = new EventEmitter<Book>()

  genresArr = this.genreService.getGenres();

  constructor(
    private genreService: GenreService,
    private bookService: BookService
  ) {}

  ngOnInit() {
  }

  book: Book = {
    name: '',
    author: '',
    date: 0,
    genre: [],
    genreId: 0,
    description: ''
  }
       
  done: boolean = false;
  submit(book: Book) {
    if(this.book.name.trim() && this.book.author.trim() && this.book.date && this.book.genreId) {
      this.bookService.postBook(book);
      this.onAdd.emit(this.book);
    }
  }
}
