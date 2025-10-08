import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	
	generateRandom(randomLength: number, randomNumbers: boolean, randomUppercase: boolean, randomLowercase: boolean, randomSymbols: (boolean | string), randomStrict: (boolean | string)){
		var generator = require('generate-password');
		var newCode = generator.generate({
			length: randomLength,
			numbers: randomNumbers,
			uppercase: randomUppercase,
			lowercase: randomLowercase,
			symbols: randomSymbols,
			strict: randomStrict,

		})
		return newCode;
	}

	getHello(): string {
		return 'Welcome! Willkommen! Benvenuto! Bienvenue! Tervetuloa! Irasshaimase!';
	}
}
