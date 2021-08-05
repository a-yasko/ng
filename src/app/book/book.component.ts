import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../app.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['../../../node_modules/bootstrap/scss/bootstrap.scss', './book.component.scss']
})
export class BookComponent implements OnInit {
  @Input() book!: Book;
  @Output() onRemove = new EventEmitter<any>();

  constructor(
    private bookService: BookService
  ) {}

  ngOnInit(): void {
  }

  removePost() {
    this.onRemove.emit(this.book.id);
  }
}
