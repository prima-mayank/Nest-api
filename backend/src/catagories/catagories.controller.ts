import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CatagoriesService } from './catagories.service';
import { CreateCategoryDto } from './dto/create-catagory.dto';
import { UpdateCatagoryDto } from './dto/update-catagory.dto';

import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { AuthorizeGuard } from 'src/utility/guards/authorization.guard';
import { AuthorizeRoles } from 'src/utility/decorators/authorize-roles.decorator';
import { Roles } from 'src/utility/common/user-roles.enum';
import { CategoryEntity } from './entities/catagory.entity';

@Controller('catagories')
export class CatagoriesController {
  constructor(private readonly catagoriesService: CatagoriesService) {}

  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard,AuthorizeGuard)
  @Post()
  async create(@Body() createCatagoryDto: CreateCategoryDto, @CurrentUser() currentUser:UserEntity):Promise<CategoryEntity> {
    return await this.catagoriesService.create(createCatagoryDto,currentUser);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CategoryEntity | null> {
    return await this.catagoriesService.findOne(+id);
  }
 
  @Get()
  async findAll(): Promise<CategoryEntity[] | null> {
    return await this.catagoriesService.findAll();
  } 

  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard,AuthorizeGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatagoryDto: UpdateCatagoryDto) {
    return this.catagoriesService.update(+id, updateCatagoryDto);
  }
  

}