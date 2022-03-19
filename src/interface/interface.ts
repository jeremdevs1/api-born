import { Request } from "express";

interface ITokenPayload { id: string, username: string }
interface IExtendedRequest extends Request {
    user: ITokenPayload
}

interface IMealInterface {
    name:string,
    ingrediets:Object
}

interface IErrorResponse {
    status: number,
    message: string,
    data: string
}


export { ITokenPayload, IMealInterface, IExtendedRequest, IErrorResponse }