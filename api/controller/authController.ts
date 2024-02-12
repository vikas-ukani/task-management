import { Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import User from "../models/userModel";
import { generateAccessToken } from "../utils";
import { ObjectId } from "mongoose";

export default {
    socialAuth: async (req: Request, res: Response) => {
        try {
            const body = req.body
            if (!body.name || !body.email || !req.params.social || !body.accessToken) {
                return res.json({ message: "Invalid credentials, Please use valid gmail id." }).status(400)
            }
            const user = jwt.decode(body.accessToken)
            if (user == null) return res.json({ message: "Invalid user token, Please try again." }).status(400)
            let findUser: any = await User.findOne({ email: body.email }).lean()
            if (!findUser) {
                findUser = await User.create(user)
                findUser = await findUser.save()
            }
            const token = generateAccessToken({ _id: findUser._id, name: body.name, email: body.email })
            return res.json({ token, user: findUser, message: "Logged In successful" }).status(400)
        } catch (error: any) {
            return res.json({ message: 'Internal server error', error }).status(400)
        }
    }
}