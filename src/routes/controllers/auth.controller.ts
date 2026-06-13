import type { Request, Response } from "express"
import prisma from "../../lib/prisma.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


export const signup = async( req: Request, res: Response )=>{
    const { name, email, password } = req.body
    // console.log(name, email);

    //!Checking for existing user
    try {
        const existingUser = await prisma.user.findFirst({
            where: {email:email}
        })
        if(existingUser){
            console.log("User already exist");
            console.log("response 1");
           return res.status(409).json({ message: "User already exists" })
        }
    } catch (error) {
        console.log("response 2");
        console.log(error);
        res.status(400).json({ message: "Error in email"})
    }

    // const PASSWORD = password
    //!Password hashing
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        
        const signup = await prisma.user.create({
            data:{
                name: name,
                email: email,
                password: hashedPassword
            }
        })
//!generate jwt token and return it
        const token = jwt.sign({
            userId: signup.id
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: "7d"
        }
    )
        console.log("response 3");
        res.status(201).json({token, id:signup.id, name:signup.name, email:signup.email})
    } catch (error) {
        console.log("response 4");
        res.status(500).json({message: "Error creating user"})
    }

   

    

    
}

export const login = async(  )=>{
    console.log("hello");
    
}