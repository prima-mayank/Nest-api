import { Injectable } from '@nestjs/common';
import { CreateCatagoryDto } from './dto/create-catagory.dto';
import { UpdateCatagoryDto } from './dto/update-catagory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/catagory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CatagoriesService {

   constructor(
      @InjectRepository(CategoryEntity)
      private categoryRepository: Repository<CategoryEntity>,
    ) {}
  
  create(createCatagoryDto: CreateCatagoryDto) {
    return 'This action adds a new catagory';
  }

  findAll() {
    return `This action returns all catagories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} catagory`;
  }

  update(id: number, updateCatagoryDto: UpdateCatagoryDto) {
    return `This action updates a #${id} catagory`;
  }

  remove(id: number) {
    return `This action removes a #${id} catagory`;
  }
}
