import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import * as mysql from 'mysql2/promise';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BooksService {
  db: PrismaService;
  constructor(db: PrismaService) {
    this.db = db;
  }
  books: Book[] = [
    {
      id: 1,
      title: 'string',
      author: 'string',
      isbn: 'string',
      publishYear: 0,
      reserved: false,
    },
    {
      id: 2,
      title: 'valami',
      author: 'bela',
      isbn: 'strsgdhing',
      publishYear: 6546,
      reserved: false,
    },
    {
      id: 3,
      title: 'ssggeététjér',
      author: 'istván',
      isbn: 'string',
      publishYear: 234,
      reserved: false,
    },
    {
      id: 4,
      title: '.lkjjjékjkvk',
      author: 'géza',
      isbn: 'string',
      publishYear: 10,
      reserved: false,
    },
  ];
  create(createBookDto: CreateBookDto) {
    return this.db.book.create({ data: createBookDto });
  }

  async findAll() {
    return this.db.book.findMany();
  }

  findOne(id: number) {
    return this.db.book.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    try {
      return await this.db.book.update({
        where: {
          id: id,
        },
        data: updateBookDto,
      });
    } catch {
      return undefined;
    }
  }

  async remove(id: number) {
    try{
    return await this.db.book.delete({
      where: {
        id: id,
      }
    })
    } catch {
      return undefined;
    }
  }
}
