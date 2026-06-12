import type { Request, Response } from "express"


export const signup = async( req: Request, res: Response )=>{
    const { name, email, password } = req.body
    console.log(name, email, password);

    try {
        const existingUser = await pris
    } catch (error) {
        
    }
    
}

export const login = async( req: Request, res: Response )=>{
    
}