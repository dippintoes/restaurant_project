"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantModel = void 0;
const mongoose_1 = require("mongoose");
const base_schema_1 = require("../../utility/base-schema");
const status_types_1 = require("../status/status.types");
const RestaurantSchema = new base_schema_1.BaseSchema({
    official_name: {
        type: String,
        required: true
    },
    ownerId: {
        type: mongoose_1.Types.ObjectId,
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
        type: mongoose_1.Types.ObjectId,
        required: true,
        default: status_types_1.Status.Pending
    },
    branches: {
        type: [String],
        required: false
    }
});
exports.RestaurantModel = (0, mongoose_1.model)("Restaurants", RestaurantSchema);
