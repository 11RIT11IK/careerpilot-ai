import {Request, Response, NextFunction} from 'express'

export const validateLoginRequest = (req: Request, res: Response, next: NextFunction): void => {
const {email ,password } = req.body
const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

try {
	if(!email || !password){
  res.status(400).json({success:false,message:'Bad request! Required data is missing.'})
	return;
	}

if(!emailRegex.test(email)){
res.status(400).json({success:false,field: "email",message:"Please enter a valid email address."})
return;
}

next();
	
} catch (error) {
	res.status(500).json({success:false,message:'Internal server error.'})
	return;
}
}