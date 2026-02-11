import { 
  IsArray, 
  IsNotEmpty, 
  IsNumber, 
  IsPositive, 
  IsString, 
  Min 
} from "class-validator";

export class CreateProductDto {
  @IsNotEmpty({ message: 'title can not be blank.' })
  @IsString()
  title: string;

  @IsNotEmpty({ message: 'description can not be empty.' })
  @IsString()
  description: string;

  @IsNotEmpty({ message: 'price should not be empty.' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'price should be a number with max 2 decimal places.' })
  @IsPositive({ message: 'price should be a positive number.' })
  price: number;

  @IsNotEmpty({ message: 'stock should not be empty.' })
  @IsNumber({}, { message: 'stock should be a number.' })
  @Min(0, { message: 'stock can not be negative.' })
  stock: number;

  @IsNotEmpty({ message: 'images should not be empty.' })
  @IsArray({ message: 'images should be in array format.' })
  @IsString({ each: true, message: 'each image must be a string.' })
  images: string[];

  @IsNotEmpty({ message: 'category should not be empty.' })
  @IsNumber({}, { message: 'category id should be a number.' })
  category: number;
}