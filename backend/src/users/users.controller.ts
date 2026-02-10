import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserSignupDto} from './dto/user-signup.dto';
import { UserEntity } from './entities/user.entity';
import { UserSigninDto } from './dto/user-signin.dto';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';

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

@UseGuards(AuthenticationGuard)
@Get('me')
getProfile(@CurrentUser() currentUser:UserEntity){
  return currentUser
}








 

  
}
