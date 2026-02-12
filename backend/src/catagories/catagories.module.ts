import { Module } from '@nestjs/common';
import { CatagoriesService } from './catagories.service';
import { CatagoriesController } from './catagories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/catagory.entity'

@Module({
  imports : [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CatagoriesController],
  providers: [CatagoriesService],
  exports : [CatagoriesService]
})
export class CatagoriesModule {}
