import "dotenv/config";
import { Request, Response } from 'express';
import expressAsyncHandler from "express-async-handler";
import { success } from 'zod';
import bcrypt from "bcrypt";
import prisma from "../config/database";
import jwt from "jsonwebtoken";

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

export const handleLoginUser = expressAsyncHandler(async(req: Request, res: Response): Promise<void> => {
const {email ,password } = req.body
console.log('handleLoginUser reached');

try {

	//we need to tell prisma to go and check this email id is there or not in user table if ther just fetch that user password 
	//if there is no such user return if there is next we need to compare their password ued bcrypt right and if it is wrong just retirn something like invalid passsword 
	const existingUser = await prisma.user.findUnique({
		 where: {
    email,
  },
	})

	if (!existingUser) {
	console.log('no such user');
	
  res.status(401).json({
    success: false,
    message: "Sorry no such user found,invalid email or password"
  });

  return;
}

const isPasswordCorrect = await bcrypt.compare(
  password,
  existingUser.password
);

if (!isPasswordCorrect) {
  res.status(401).json({
    success: false,
    message: "Sorry no such user found,invalid email or password"
  });

  return;
}
const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"];

const token = jwt.sign(
  {
    userId: existingUser.id,
    email: existingUser.email,
  },
  JWT_SECRET,
  {
    expiresIn: JWT_EXPIRES_IN
  }
);

console.log("Setting cookie...");
console.log("Token:", token);

res.cookie("accessToken", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 24 * 60 * 60 * 1000,
});

console.log("Cookie set");

res.status(200).json({
  success: true,
  message: "Login successful.",
  user: {
    id: existingUser.id,
    fullName: existingUser.fullName,
    email: existingUser.email,
  },
});
return;


} catch (error) {
	res.status(500).json({success:false,message:"Internal server errror"});
	return;
}
})

export const fetchLoggedUserData = expressAsyncHandler(async(req: Request, res: Response): Promise<void> => {
console.log('fetchLoggedUserData reached');

try {
	const authUser = res.locals.user;

	const user = await prisma.user.findUnique({
		where : {
			id: authUser.userId,
		},
		 select: {
     id: true,
     fullName: true,
     email: true,
     },
	})

	 if (!user) {
		console.log('no such user is there');
		
        res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
        return;
      }
	
	 res.status(200).json({
        success: true,
        message: "User fetched successfully.",
        user,
      });

      return;
			
		} catch (error) {
	console.error("Fetch logged user error:", error);

      res.status(500).json({
        success: false,
        message: "Internal server error.",
      });

      return;
}
})

export const handleSignOut = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {

      res.clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res.status(200).json({
        success: true,
        message: "Signed out successfully.",
      });

      return;

    } catch (error) {

      console.error("Sign out error:", error);

      res.status(500).json({
        success: false,
        message: "Internal server error.",
      });

      return;

    }
  }
);
