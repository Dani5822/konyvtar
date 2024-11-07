import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBookDto {
    @IsNotEmpty()
    @IsString()
    title: string;
    author:string;
    isbn: string;
    @IsNotEmpty()
    @IsNumber()
    publishYear:number;
}
