import jwt from 'jsonwebtoken';
export enum Status {
    ToDo = 'To Do',
    InProgress = 'In Progress',
    Done = 'Done'
}

export function generateAccessToken(user: { _id: string, name: string, email: string }) {
    return jwt.sign(user, process.env.JWT_SECRET as string, { expiresIn: '1800s' });
}
