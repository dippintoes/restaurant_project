"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.Status = {
    Pending: new mongoose_1.default.mongo.ObjectId("641aa4847e154eba8061f3f0"),
    Approved: new mongoose_1.default.mongo.ObjectId("641aa4967e154eba8061f3f2"),
    Rejected: new mongoose_1.default.mongo.ObjectId("641aa4a37e154eba8061f3f4")
};
