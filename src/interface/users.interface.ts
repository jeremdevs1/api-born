interface ICreateUser {
    username: string
    role: string
    password: string
}

interface ICreateUserResponse { data: ICreateUser }

export { ICreateUser, ICreateUserResponse }