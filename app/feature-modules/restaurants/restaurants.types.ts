import { ObjectId } from "bson";

export interface IRestaurant {
    _id?: string,
    official_name: string,
    ownerId?: ObjectId,
    location: string,
    menu: Object,
    capacity: number,
    approval_status: ObjectId,
    branches?: string[]
}

export type Restaurants = IRestaurant[];