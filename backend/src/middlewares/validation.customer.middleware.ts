
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { CustomerService } from '../user/customer/customer.service';
import { comparePasswords } from '../utils/bcrypt';

@Injectable()
export class ValidationCustomerMiddleware implements NestMiddleware {
  constructor(
    private readonly customerService: CustomerService){}

  async use(req: Request, res: Response, next: NextFunction) {
    const {enterPassword} = req.body;
    const {code} = req.body;
    const customerData = await this.customerService.getCustomerByCode(code);
    const customerPassword = customerData.password;

    if (!enterPassword) return res.status(403).send({error: 'No Authentification Token'})
    if (comparePasswords(enterPassword, customerPassword)){
      next();
    }
    else {
      return res.status(403).send({error: 'Invalid Authentication Token'});
    }
  }
}

