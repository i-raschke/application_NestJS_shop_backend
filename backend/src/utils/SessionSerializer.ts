import { PassportSerializer } from "@nestjs/passport";
import { CustomerService} from "../user/customer/customer.service";
import { MerchantService } from "../user/merchant/merchant.service";
import { ObjectService } from "../object/object.service";


export class SessionSerializer extends PassportSerializer{
	constructor(
		private readonly customerService: CustomerService,
		private readonly merchantService: MerchantService,
		private readonly objectService: ObjectService){
				super();
	}

	serializeUser(user: any, done: (err, user: any) => void) {
		done(null, user);
				
	}

	async deserializeUser(payload: any, done: (err, payload: string) => void) {

		done(null, payload);
				
	}
}

