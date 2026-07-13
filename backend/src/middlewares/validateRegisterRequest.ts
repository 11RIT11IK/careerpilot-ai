import {Request, Response, NextFunction} from 'express'
import { success } from 'zod';

export const validateRegisterRequest = (req: Request, res: Response, next: NextFunction): void => {
console.log('validateRegisterRequest reached');
	
const {fullName, email, password } = req.body
const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex: RegExp = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

try {

if(!fullName || !email || !password){
res.status(400).json({success:false,message:'Bad request! Required data is missing.'})
return;
}

if(!emailRegex.test(email)){
res.status(400).json({success:false,field: "email",message:"Please enter a valid email address."})
return;
}

if(!passwordRegex.test(password)){
res.status(400).json({success:false, field: "password",message:"Password must be at least 8 characters long and include at least one letter and one number."})
return;
}

next();

} catch (error) {
	res.status(500).json({success:false,message:'Internal server error.'})
	return;
}
}