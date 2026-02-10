import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserSignupDto} from './dto/user-signup.dto';
import { UserEntity } from './entities/user.entity';
import { UserSigninDto } from './dto/user-signin.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async signup(@Body() userSignupDto: UserSignupDto): Promise<UserEntity> {
    return await this.usersService.signup(userSignupDto);
  }

  @Post('signin')
  async signin(@Body() userSigninDto: UserSigninDto):Promise<any> {
    return await this.usersService.signin(userSigninDto);
  }











 

  
}
