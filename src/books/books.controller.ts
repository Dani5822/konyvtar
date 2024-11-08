import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    return await this.booksService.create(createBookDto);
  }

  @Get()
  async findAll() {
    return await this.booksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const book = await this.booksService.findOne(+id);
    if (book !== null) {
        return book;
    }
    throw new NotFoundException('Book not found');
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    if( await this.booksService.update(+id, updateBookDto)){
      return { statusCode: 200, message: 'Book updated successfully' };
    }
    throw new NotFoundException('Book not found');
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if( await this.booksService.remove(+id)){
      return { statusCode: 204, message: 'Book deleted successfully' };
    }
    throw new NotFoundException('Book not found');
  }
}
