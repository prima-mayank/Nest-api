import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-catagory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/catagory.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { UpdateCatagoryDto } from './dto/update-catagory.dto';

@Injectable()
export class CatagoriesService {

   constructor(
      @InjectRepository(CategoryEntity)
      private categoryRepository: Repository<CategoryEntity>,
    ) {}
  
  async create(createCatagoryDto: CreateCategoryDto,currentUser:UserEntity) : Promise<CategoryEntity>{
    const catagory= this.categoryRepository.create(createCatagoryDto)
    catagory.addedBy=currentUser
    return this.categoryRepository.save(catagory);
  }

  async findOne(id: number): Promise<CategoryEntity | null> {
    const catagory = await this.categoryRepository.findOne({
      where : { id },
      relations: { addedBy: true },
      select : {
        addedBy: {
          id: true,
          name: true,
          email: true
        }
      }
    })
    return catagory;
  }
  async findAll(): Promise<CategoryEntity[] | null> {
    const catagory = await this.categoryRepository.find();
    return catagory;
  }

  async update(id: number, updateCatagoryDto: UpdateCatagoryDto): Promise<any> {
    const catagory = await this.categoryRepository.findOneBy({ id });
    if(!catagory) throw new NotFoundException('Catagory not found');
    Object.assign(catagory, updateCatagoryDto);
    return await this.categoryRepository.save(catagory);  }
  }
  
