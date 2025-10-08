import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { MerchantService } from '../user/merchant/merchant.service';
import { comparePasswords } from '../utils/bcrypt';

@Injectable()
export class ConfirmationMerchantMiddleware implements NestMiddleware {
  constructor(private readonly merchantService: MerchantService){}

  async use(req: Request, res: Response, next: NextFunction) {
    const {code} = req.body;
    const {password} = req.body;
    const {confirmPassword} = req.body;
    const merchantData = await this.merchantService.getMerchantByCode(code);

    if ((!comparePasswords(password, merchantData.password)) && (password === confirmPassword)){
      
      next();
    }

    else{
      return res.status(403).send({error: 'Password change not successful'});
    }
    
  }
}
