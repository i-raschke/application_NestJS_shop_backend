import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AdminService } from '../user/admin/admin.service';
import { comparePasswords } from '../utils/bcrypt';

@Injectable()
export class ConfirmationAdminMiddleware implements NestMiddleware {
  constructor(private readonly adminService: AdminService) { }

  async use(req: Request, res: Response, next: NextFunction) {
    const { code } = req.body;
    const { password } = req.body;
    const { confirmPassword } = req.body;
    const adminData = await this.adminService.getAdminByCode(code);

    if ((!comparePasswords(password, adminData.password)) && (password === confirmPassword)) {

      next();
    }

    else {
      return res.status(403).send({ error: 'Password change not successful' });
    }

  }
}
