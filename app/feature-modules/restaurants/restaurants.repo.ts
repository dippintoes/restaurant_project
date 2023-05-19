import { FilterQuery, UpdateQuery } from "mongoose";
import { RestaurantModel } from "./restaurants.schema";
import { IRestaurant } from "./restaurants.types";

const createRes = (restro: IRestaurant) => RestaurantModel.create(restro);

const findRes = (id: any) => RestaurantModel.findOne({ _id: id });

const findAll = (filter: FilterQuery<IRestaurant>) => {
    return RestaurantModel.find(filter);
}

const updateRes = (filter: FilterQuery<IRestaurant>, update: UpdateQuery<IRestaurant>) =>
    RestaurantModel.findOneAndUpdate(filter, update, { new: true });

const updateBranch = (filter: FilterQuery<IRestaurant>, update: UpdateQuery<IRestaurant>) => RestaurantModel.findByIdAndUpdate(filter, update, { new: true });

export default {
    createRes,
    findRes,
    findAll,
    updateRes,
    updateBranch,
}