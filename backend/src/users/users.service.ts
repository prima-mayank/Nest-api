import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserSignupDto } from './dto/user-signup.dto';
import * as bcrypt from 'bcrypt';
import { UserSigninDto } from './dto/user-signin.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UsersService {

  // signup()

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async signup(userSignupDto: UserSignupDto): Promise<UserEntity> {
    const { name, email, password } = userSignupDto;

    if (!name || !email || !password) {
      throw new BadRequestException('name, email and password are required');
    }

    if(await this.findUserByEmail(email)) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let user = this.userRepository.create({ name, email, password: hashedPassword });
     await this.userRepository.save(user);
  

    const { password: _, ...result } = user;
    return result as UserEntity;
  }

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    return await this.userRepository.findOneBy({ email });
  }


  async signin(userSigninDto: UserSigninDto):Promise<{user: UserEntity, token: string}>{
    const {email, password} = userSigninDto;

    if(!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    const user = await this.userRepository.findOne({ where: { email }, select: ['id', 'name', 'email', 'password'] });

    if(!user) {
      throw new BadRequestException('Invalid email or password');
    }

    if(!await bcrypt.compare(password, user.password)) {
      throw new BadRequestException('Invalid email or password');
    }

    const token = await this.accessToken(user);

    const { password: _, ...result } = user;
    return { ...result, token } as any;
  }


  async accessToken(user: UserEntity): Promise<string> {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    return sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: '1h' });
  }

  async findOne(id: number): Promise<UserEntity | null> {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }
}
