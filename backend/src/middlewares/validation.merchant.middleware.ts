import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { MerchantService } from '../user/merchant/merchant.service';

import { comparePasswords } from '../utils/bcrypt';

@Injectable()
export class ValidationMerchantMiddleware implements NestMiddleware {
  constructor(
    private readonly merchantService: MerchantService){}

  async use(req: Request, res: Response, next: NextFunction) {
    const {enterPassword} = req.body;
    const {code} = req.body;
    const merchantData = await this.merchantService.getMerchantByCode(code);
    const merchantPassword = merchantData.password;
    
    if (!enterPassword) return res.status(403).send({error: 'No Authentification Token'})
    if (comparePasswords(enterPassword, merchantPassword)){
      next();
    }
    else {
      return res.status(403).send({error: 'Invalid Authentication Token'});
    }
  }
}

