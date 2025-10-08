
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AdminService } from '../user/admin/admin.service';
import { comparePasswords } from '../utils/bcrypt';

@Injectable()
export class ValidationAdminMiddleware implements NestMiddleware {
  constructor(
    private readonly adminService: AdminService){}

  async use(req: Request, res: Response, next: NextFunction) {   
    const {enterPassword} = req.body;
    const {code} = req.body;
    const adminData = await this.adminService.getAdminByCode(code);
    const customerPassword = adminData.password;
   
    if (!enterPassword) return res.status(403).send({error: 'No Authentification Token'})
    if (comparePasswords(enterPassword, customerPassword)){     
      next();
    }
    else {
      return res.status(403).send({error: 'Invalid Authentication Token'});
    }
  }
}

