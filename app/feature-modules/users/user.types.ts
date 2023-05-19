import { ObjectId } from "bson";

export interface IUser {
    _id?: string
    name: string,
    email: string,
    password: string,
    role?: ObjectId,
    restaurants?: Object[]
}

export type Users = IUser[];
