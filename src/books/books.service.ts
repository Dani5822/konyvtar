import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import * as mysql from 'mysql2/promise'

@Injectable()
export class BooksService {
  mysql :mysql.Pool;
  constructor() {
    this.mysql = mysql.createPool({
      host: 'localhost',
      user: 'root',
      database: 'konyvtar',
    })
  }
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

    let help = {
      ...createBookDto,
      id:0,
      reserved : false
    };
    if (this.books.length == 0) {
      help.id = 1
    }
    else {
      help.id = this.books[this.books.length - 1].id + 1;
    }
    
    this.books.push(help);
    return this.findAll()
  }

  async findAll() {
    const [results] =await this.mysql.query('SELECT * FROM books')
    return results;
  }

  findOne(id: number) {
    return this.books.find((book) => {
      if (book.id == id) {
        return book
      }
    });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    
    let book: Book;
    this.books.forEach((element, idx) => {
      if (element.id == id) {
        book = {
          ...element,
          ...updateBookDto
        }
        this.books[idx]=book;
        return;
      }
    });
    if(book!=undefined){
      await this.mysql.query('UPDATE books SET title = ?, author = ?, isbn = ?, publishYear = ?, reserved = ? WHERE id = ?', [book.title, book.author, book.isbn, book.publishYear, book.reserved, id])
      return true;
    }else{
      return false;
    }
  };

  async remove(id: number) {
    const[results]=await this.mysql.query('DELETE FROM books WHERE id = ?', [id])
    return (results as mysql.ResultSetHeader).affectedRows==1;
  }
}
