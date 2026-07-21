import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
	console.log('verifyToken reached');
	
	try {

		const token = req.cookies?.accessToken;

		if(!token){
			console.log('no token in verifyToken');
			
			  res.status(401).json({
        success: false,
        message: "Unauthorized",
        });

      return;
		}

		const JWT_SECRET = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(
     token,
     JWT_SECRET
     ) as jwt.JwtPayload;

		  res.locals.user = {
      userId: decoded.userId,
      email: decoded.email,
        };

    next()
		
	} catch (error) {
  console.error("JWT Verify Error:", error);
		
		 res.status(401).json({
     success: false,
     message: "Unauthorized",
    });
	}
}