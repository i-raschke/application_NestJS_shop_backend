import { Controller, Get, Post, Req, Session, UseGuards, Inject, UseInterceptors, ClassSerializerInterceptor, Res, HttpStatus, } from '@nestjs/common';
import { Request } from 'express';
import { CustomerService } from '../user/customer/customer.service';
import { MerchantService } from '../user/merchant/merchant.service';
import { AuthenticatedGuard, LocalGuard } from '../utils/local.guard';
import { AuthService } from './auth.service';
import { SerializedUser } from '../utils/serializer';






@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
	constructor(
		private readonly customerService: CustomerService,
		private readonly merchantsService: MerchantService,
		private readonly authService: AuthService,
	){}
	
//Post Routes
  
	@UseGuards(LocalGuard)
	@Post('login')
	login(@Session() session: Record<string, any>, @Req () req, @Res({ passthrough: true }) res){	

		if(session.passport.user){
      console.log(req.sessionID);
			return res.redirect(HttpStatus.MOVED_PERMANENTLY, `http://localhost:7331/auth/loggedIn/` + session.passport.user.code);
		}
		else{
      return('An error has occured');
		}	
		
	}

//Get Routes

	@UseGuards(AuthenticatedGuard)
	@Get('loggedIn/:code')
	async loggedIn(@Session() session: Record<string, any>, @Req() req: Request): Promise<any> {
    const user = session.passport.user;

    if(user.firstName){
      return 'Welcome ' + user.firstName + ' ' + user.lastName + '!';
    }
    if(session.passport.user.companyName){
      return 'Welcome ' + user.companyName + '!';
    }
    else{
      return('An error has occured');
    }

		
	}


	@UseGuards(AuthenticatedGuard)
	@Get('profile')
	async profile(@Session() session: Record<string, any>, @Req() req: Request): Promise<any> {

    const user = session.passport.user;
    if(user){
      return new SerializedUser(user);
    }
    else{
      return('An error has occured');
    }		
	}



	@UseGuards(AuthenticatedGuard)
	@Get('logout')
	async logout(@Session() session: Record<string, any>, @Req() req: Request, @Res() res){
		req.session.destroy(() => {
			res.redirect('loggedOut');
			});
      return('An error has occured');
	}

	@Get('loggedOut')
	async loggedOut(){
		return 'Bye';
	}

}
