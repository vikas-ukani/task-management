import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';


export default function authenticateToken(req: any, res: Response, next: NextFunction) {
   try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (null == token) return res.status(401).json({ status: false, message: "Please login to access information." })

    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
        if (err) return res.status(403).json({ status: false, message: "Please login to access information.", error: err })
        req.user = user
        next()
    })
   } catch (error) {
    return res.status(401).json({ error, status: false, message: "Please login to access information." })
   }
}