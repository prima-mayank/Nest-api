import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(ProductEntity) private readonly productsRepository:Repository<ProductEntity> ){}
  async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
  const { category, ...data } = createProductDto;

  const product = this.productsRepository.create({
    ...data,
    category: { id: category }, // map numeric id to relation object
  });

  return this.productsRepository.save(product);
}


  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
