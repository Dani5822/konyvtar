import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import e from 'express';

@Injectable()
export class BooksService {
  books: Book[] = [{
    id: 1,
    title: "string",
    author: "string",
    isbn: "string",
    publishYear: 0,
    reserved: false,
  },
  {
    id: 2,
    title: "valami",
    author: "bela",
    isbn: "strsgdhing",
    publishYear: 6546,
    reserved: false,
  },
  {
    id: 3,
    title: "ssggeététjér",
    author: "istván",
    isbn: "string",
    publishYear: 234,
    reserved: false,
  },
  {
    id: 4,
    title: ".lkjjjékjkvk",
    author: "géza",
    isbn: "string",
    publishYear: 10,
    reserved: false,
  }



  ];
  create(createBookDto: CreateBookDto) {

    let help = new Book();
    if (this.books.length == 0) {
      help.id = 1
    }
    else {
      help.id = this.books[this.books.length - 1].id + 1;
    }
    help.title = createBookDto.title;
    help.author = createBookDto.author;
    help.reserved = false;
    help.isbn = createBookDto.isbn;
    help.publishYear = createBookDto.publishYear;
    this.books.push(help);
    return this.findAll()
  }

  findAll() {
    return this.books;
  }

  findOne(id: number) {
    return this.books.find((book) => {
      if (book.id == id) {
        return book
      }
    });
  }

  update(id: number, updateBookDto: UpdateBookDto) {
   
    this.books.forEach((element, idx) => {
      if (element.id == id) {
        element = {
          ...element,
          ...updateBookDto
        }
        this.books[idx]=element
       
      }
      console.log(element)
    });
  };


remove(id: number) {
  this.books.splice(this.books.findIndex((book) => {
    if (book.id === id) {
      console.log(book)
      return book.id
    }
  }

  ), 1);

}
}
