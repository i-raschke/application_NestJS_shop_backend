import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { CustomerService } from '../user/customer/customer.service';
import { comparePasswords } from '../utils/bcrypt';

@Injectable()
export class ConfirmationCustomerMiddleware implements NestMiddleware {
  constructor(private readonly customerService: CustomerService){}

  async use(req: Request, res: Response, next: NextFunction) {
    const {code} = req.body;
    const {password} = req.body;
    const {confirmPassword} = req.body;
    const customerData = await this.customerService.getCustomerByCode(code);

    if ((!comparePasswords(password, customerData.password)) && (password === confirmPassword)){
      
      next();
    }

    else{
      return res.status(403).send({error: 'Password change not successful'});
    }
    
  }
}
