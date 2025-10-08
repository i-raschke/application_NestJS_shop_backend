import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';






@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}


  canActivate(context: ExecutionContext): boolean {
    
    try{
      const requiredRole = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]).toString();
      try{
        const { session } = context.switchToHttp().getRequest();
        return (requiredRole === session.passport.user.role);
      }catch (error){
        throw new HttpException({
          status: HttpStatus.FORBIDDEN,
          error: 'You can not access this function. Have you tried to log in?',
        }, HttpStatus.FORBIDDEN, {
          cause: error
        });
  
      }

    }catch{
      return false;
    }
    
  }
}


