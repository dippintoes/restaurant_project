import { Types, model } from "mongoose";
import { BaseSchema } from "../../utility/base-schema";
import { IRestaurant } from "./restaurants.types";
import { Status } from "../status/status.types";

const RestaurantSchema = new BaseSchema({
    official_name: {
        type: String,
        required: true
    },
    ownerId: {
        type: Types.ObjectId,
        required: true,
        ref: "Users"
    },
    location: {
        type: String,
        required: true
    },
    menu: {
        type: Object,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    approval_status: {
        type: Types.ObjectId,
        required: true,
        default: Status.Pending
    },
    branches: {
        type: [String],
        required: false
    }
})

type RestaurantDocument = Document & IRestaurant;

export const RestaurantModel = model<RestaurantDocument>("Restaurants", RestaurantSchema);