import * as bcrypt from 'bcryptjs';


export function hashPassword(rawPassword: string){
	const SALT = 10;
	return bcrypt.hashSync(rawPassword, SALT);
}

export function comparePasswords(rawPassword: string, hash: string){
	return bcrypt.compareSync(rawPassword, hash);

}