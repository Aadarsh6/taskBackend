import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"


interface AuthRequest extends Request{
    userId? : string
}


export function authMiddleware(req:AuthRequest, res:Response, next:NextFunction){
    const token = req.headers.authorization?.split(" ")[1]
    // const token = req.header.("authorization")?.split(" ")[1]  header vs headers
    if(!token) return res.status(404).json({message: "Token not found"})

        try {
            const verify = jwt.verify(token, process.env.JWT_SECRET!) as { userId : string }
            req.userId = verify.userId
            next()
        } catch (error) {
            res.status(401).json({message:"Can't authenticate user, pls login again"})
        }
}

