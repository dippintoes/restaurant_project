"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restaurants_schema_1 = require("./restaurants.schema");
const createRes = (restro) => restaurants_schema_1.RestaurantModel.create(restro);
const findRes = (id) => restaurants_schema_1.RestaurantModel.findOne({ _id: id });
const findAll = (filter) => {
    console.log("FIILTER: ", filter);
    return restaurants_schema_1.RestaurantModel.find(filter);
};
const updateRes = (filter, update) => restaurants_schema_1.RestaurantModel.findOneAndUpdate(filter, update, { new: true });
const updateBranch = (filter, update) => restaurants_schema_1.RestaurantModel.findByIdAndUpdate(filter, update, { new: true });
const deleteOne = (filter) => restaurants_schema_1.RestaurantModel.deleteOne(filter);
exports.default = {
    createRes,
    findRes,
    findAll,
    updateRes,
    updateBranch,
    deleteOne
};
