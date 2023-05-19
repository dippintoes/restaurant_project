"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const restaurants_repo_1 = __importDefault(require("./restaurants.repo"));
const restaurants_responses_1 = require("./restaurants.responses");
const createRes = (restro) => __awaiter(void 0, void 0, void 0, function* () {
    restro.branches = [];
    const newRestro = yield restaurants_repo_1.default.createRes(restro);
    if (!newRestro)
        restaurants_responses_1.RESTAURANT_RESPONSES.COULD_NOT_CREATE;
    return newRestro;
});
const findRes = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const restro = yield restaurants_repo_1.default.findRes(id);
    if (!restro)
        restaurants_responses_1.RESTAURANT_RESPONSES.RESTRO_NOT_FOUND;
    return restro;
});
const findAll = () => restaurants_repo_1.default.findAll({ isDeleted: false });
const updateRes = (id, rest_id, filter, update) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const foundRestro = yield restaurants_repo_1.default.findRes({ _id: new mongoose_1.default.Types.ObjectId(rest_id) });
    console.log(foundRestro);
    if (((_a = foundRestro === null || foundRestro === void 0 ? void 0 : foundRestro.ownerId) === null || _a === void 0 ? void 0 : _a.toString()) === id.toString()) {
        console.log((_b = foundRestro === null || foundRestro === void 0 ? void 0 : foundRestro.ownerId) === null || _b === void 0 ? void 0 : _b.toString());
        console.log(id.toString());
        const restro = yield restaurants_repo_1.default.updateRes(filter, update);
        if (!restro)
            restaurants_responses_1.RESTAURANT_RESPONSES.RESTRO_NOT_FOUND;
        return restro;
    }
    else {
        throw { "message": "UnAuthorized User", "statusCode": 404 };
    }
});
const updateBranch = (id, rest_id, filter, update) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const foundRestro = yield restaurants_repo_1.default.findRes({ _id: new mongoose_1.default.Types.ObjectId(rest_id) });
    console.log(foundRestro);
    if (((_c = foundRestro === null || foundRestro === void 0 ? void 0 : foundRestro.ownerId) === null || _c === void 0 ? void 0 : _c.toString()) === id.toString()) {
        console.log((_d = foundRestro === null || foundRestro === void 0 ? void 0 : foundRestro.ownerId) === null || _d === void 0 ? void 0 : _d.toString());
        console.log(id.toString());
        const restro = yield restaurants_repo_1.default.updateBranch(filter, update);
        if (!restro)
            restaurants_responses_1.RESTAURANT_RESPONSES.RESTRO_NOT_FOUND;
        return restro;
    }
    else {
        throw { "message": "UnAuthorized User", "statusCode": 404 };
    }
});
const approveRestaurant = (filter, update) => __awaiter(void 0, void 0, void 0, function* () {
    const restro = yield restaurants_repo_1.default.updateRes(filter, update);
    if (!restro)
        restaurants_responses_1.RESTAURANT_RESPONSES.RESTRO_NOT_FOUND;
    return restro;
});
const allApproved = () => __awaiter(void 0, void 0, void 0, function* () { return yield restaurants_repo_1.default.findAll({ approval_status: "641aa4967e154eba8061f3f2" }); });
const allPending = () => restaurants_repo_1.default.findAll({ approval_status: "641aa4847e154eba8061f3f0" });
const allRejected = () => restaurants_repo_1.default.findAll({ approval_status: "641aa4a37e154eba8061f3f4" });
const deleteOne = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield restaurants_repo_1.default.deleteOne(filter);
    return user;
});
exports.default = {
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
};
