interface IUser {
    _id: string,
    name: string,
    email: string,
    token: string,
}

interface ITask {
    title: string,
    description: string,
    status: string,
}

interface ITaskDoc {
    _id: string,
    title: string,
    description: string,
    status: string,
    userId: string,
    createdAt: string,
    updatedAt: string,
}