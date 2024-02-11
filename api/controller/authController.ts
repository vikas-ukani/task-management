import { Request, Response } from "express";


export default {
    socialAuth: async (req: Request, res: Response) => {
        try {
            const body = req.body
            if (!body.email || !req.params.social) {
                return res.json({ message: "Please provide email" }).status(400)
            }
            console.log('email', body.email, req.params.social)

            return res.json({ body }).status(400)
        } catch (error: any) {
            return res.json({ message: 'Internal server error', error }).status(400)
        }
    }
}