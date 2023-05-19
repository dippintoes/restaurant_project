"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.Roles = {
    ADMIN: new mongoose_1.default.mongo.ObjectId("641988a2c3bac1ad2f2db6e4"),
    USER: new mongoose_1.default.mongo.ObjectId("641988c3c3bac1ad2f2db6e6"),
    OWNER: new mongoose_1.default.mongo.ObjectId("641988d1c3bac1ad2f2db6e8")
};
