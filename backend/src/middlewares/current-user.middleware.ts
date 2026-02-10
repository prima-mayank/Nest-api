import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtPayload, verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly userService:UsersService){}
  async use(req: Request, _res: Response, next: NextFunction) {

    req['currentUser'] = null;
    const authHeader = req.headers.authorization;
    if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.split(' ')[1];
    const jwtSecret = process.env.JWT_SECRET;

    if (!token || !jwtSecret) {
      return next();
    }

    try {
      const payload = <JwtPayload>verify(token, jwtSecret);
      const { id } = payload;

      const currentUser = await this.userService.findOne(+id);
      req['currentUser'] = currentUser;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error('JWT verification error:', errorMessage);
    }

    next();
  }
}
