
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthorizeGuard implements CanActivate {
    constructor(private reflector:Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean {

     const roles = this.reflector.get("allowdRoles", context.getHandler());
    
    const request = context.switchToHttp().getRequest();
    const user = request?.curretUser?.roles.map((role:string)=>roles.includes(role)).find((val:boolean)=>val===true);
    return user?true:false
  }
}
