import { Request, Response } from 'express';
import expressAsyncHandler from "express-async-handler";
import { success } from 'zod';
import bcrypt from "bcrypt";
import prisma from "../config/database";

export const handleRegisterUser = expressAsyncHandler(async(req: Request, res: Response): Promise<void> => {
console.log('data passed for registeration',req.body);
const {fullName, email, password } = req.body

try {
	
//first thing here we can hash our password to store in db using bcrypt
const saltRounds = 10;
const hashedPassword: string = await bcrypt.hash(password,saltRounds);
console.log('hashed password: ',hashedPassword);

//now we need to write prisma commands for wht we need to do so it will tell prisma then prisma to postgresql right
const existingUser = await prisma.user.findUnique({
  where: {
    email,
  },
});

if (existingUser) {
res.status(409).json({
success: false,
message: "Sorry, this email already exists."
 });

  return;
}

const user = await prisma.user.create({
	 data: {
   fullName,
   email,
   password: hashedPassword,
  },
})

 res.status(201).json({
 success: true,
 message: "Registration successful",
 });
 return;


} catch (error) {
	res.status(500).json({success:false,message:'Internal server error'})
	return;
}

})
