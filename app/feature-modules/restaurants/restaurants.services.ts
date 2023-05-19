import mongoose, { FilterQuery, UpdateQuery } from "mongoose";
import restaurantsRepo from "./restaurants.repo";
import { RESTAURANT_RESPONSES } from "./restaurants.responses";
import { IRestaurant } from "./restaurants.types";

const createRes = async (restro: IRestaurant) => {
    restro.branches = [];
    const newRestro = await restaurantsRepo.createRes(restro);
    if (!newRestro) RESTAURANT_RESPONSES.COULD_NOT_CREATE;
    return newRestro;
}

const findRes = async (id: any) => {
    const restro = await restaurantsRepo.findRes(id);
    if (!restro) RESTAURANT_RESPONSES.RESTRO_NOT_FOUND;
    return restro;
}

const findAll = () => restaurantsRepo.findAll({ isDeleted: false });

const updateRes = async (id: string, rest_id: string, filter: FilterQuery<IRestaurant>, update: UpdateQuery<IRestaurant>) => {
    const foundRestro = await restaurantsRepo.findRes({ _id: new mongoose.Types.ObjectId(rest_id) });
    console.log(foundRestro);
    if (foundRestro?.ownerId?.toString() === id.toString()) {
        console.log(foundRestro?.ownerId?.toString());
        console.log(id.toString());
        const restro = await restaurantsRepo.updateRes(filter, update);
        if (!restro) RESTAURANT_RESPONSES.RESTRO_NOT_FOUND;
        return restro;
    }
    else {
        throw { "message": "UnAuthorized User", "statusCode": 404 }
    }
}

const updateBranch = async (id: string, rest_id: string, filter: FilterQuery<IRestaurant>, update: UpdateQuery<IRestaurant>) => {
    const foundRestro = await restaurantsRepo.findRes({ _id: new mongoose.Types.ObjectId(rest_id) });
    console.log(foundRestro);
    if (foundRestro?.ownerId?.toString() === id.toString()) {
        console.log(foundRestro?.ownerId?.toString());
        console.log(id.toString());
        const restro = await restaurantsRepo.updateBranch(filter, update);
        if (!restro) RESTAURANT_RESPONSES.RESTRO_NOT_FOUND;
        return restro;
    }
    else {
        throw { "message": "UnAuthorized User", "statusCode": 404 }
    }
}

const approveRestaurant = async (filter: FilterQuery<IRestaurant>, update: UpdateQuery<IRestaurant>) => {
    const restro = await restaurantsRepo.updateRes(filter, update);
    if (!restro) RESTAURANT_RESPONSES.RESTRO_NOT_FOUND;
    return restro;
}

const allApproved = async () => await restaurantsRepo.findAll({ approval_status: "641aa4967e154eba8061f3f2", isDeleted: false })

const allPending = () => restaurantsRepo.findAll({ approval_status: "641aa4847e154eba8061f3f0", isDeleted: false })

const allRejected = () => restaurantsRepo.findAll({ approval_status: "641aa4a37e154eba8061f3f4", isDeleted: false })

const deleteOne = async (filter: FilterQuery<IRestaurant>, update: UpdateQuery<IRestaurant>) => {
    const restro = await restaurantsRepo.updateRes(filter, update);
    if (!restro) RESTAURANT_RESPONSES.RESTRO_NOT_FOUND;
    return restro;
}

export default {
    createRes,
    findRes,
    findAll,
    updateRes,
    updateBranch,
    approveRestaurant,
    allApproved,
    allPending,
    allRejected,
    deleteOne
}