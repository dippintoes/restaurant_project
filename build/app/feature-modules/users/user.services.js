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
const roles_types_1 = require("../roles/roles.types");
const user_repo_1 = __importDefault(require("./user.repo"));
const user_responses_1 = require("./user.responses");
const create = (user) => {
    if (!user.role) {
        user.role = roles_types_1.Roles.USER;
    }
    user.restaurants = [];
    const record = user_repo_1.default.create(user);
    return record;
};
const findOne = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_repo_1.default.findOne(filter);
    if (!user)
        throw user_responses_1.USER_REPONSES.INVALID_CREDENTIALS;
    return user;
});
const updateOne = (id, update) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_repo_1.default.updateOne(id, update);
    if (!user)
        throw user_responses_1.USER_REPONSES.INVALID_CREDENTIALS;
    return user;
});
const deleteOne = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_repo_1.default.deleteOne(filter);
    return user;
});
exports.default = {
    create,
    findOne,
    updateOne,
    deleteOne
};
