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
const express_1 = require("express");
const web_token_validator_1 = require("../../utility/web-token-validator");
const check_role_1 = require("../../utility/check-role");
const restaurants_services_1 = __importDefault(require("./restaurants.services"));
const Response_handler_1 = require("../../utility/Response-handler");
const user_services_1 = __importDefault(require("../users/user.services"));
const mongoose_1 = __importDefault(require("mongoose"));
const roles_types_1 = require("../roles/roles.types");
const user_schema_1 = require("../users/user.schema");
const router = (0, express_1.Router)();
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield restaurants_services_1.default.findAll();
        res.send(new Response_handler_1.RESPONSE_HANDLER(result));
    }
    catch (e) {
        next(e);
    }
}));
router.get("/allApproved", web_token_validator_1.validateWebToken, (0, check_role_1.checkRole)(["641988a2c3bac1ad2f2db6e4"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield restaurants_services_1.default.allApproved();
        res.send(new Response_handler_1.RESPONSE_HANDLER(result));
    }
    catch (e) {
        next(e);
    }
}));
router.get("/allRejected", web_token_validator_1.validateWebToken, (0, check_role_1.checkRole)(["641988a2c3bac1ad2f2db6e4"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield restaurants_services_1.default.allRejected();
        res.send(new Response_handler_1.RESPONSE_HANDLER(result));
    }
    catch (e) {
        next(e);
    }
}));
router.get("/allPending", web_token_validator_1.validateWebToken, (0, check_role_1.checkRole)(["641988a2c3bac1ad2f2db6e4"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield restaurants_services_1.default.allPending();
        res.send(new Response_handler_1.RESPONSE_HANDLER(result));
    }
    catch (e) {
        next(e);
    }
}));
router.post("/create", web_token_validator_1.validateWebToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = res.locals.tokenId;
        const rest = req.body;
        const owner = yield user_services_1.default.findOne({ _id: new mongoose_1.default.Types.ObjectId((id).toString()) });
        owner.role = roles_types_1.Roles.OWNER;
        rest.ownerId = id;
        yield user_schema_1.UserModel.findByIdAndUpdate(new mongoose_1.default.Types.ObjectId((id).toString()), { $push: { "restaurants": rest } }, {
            new: true,
        });
        const result = yield restaurants_services_1.default.createRes(rest);
        res.send(new Response_handler_1.RESPONSE_HANDLER(result));
    }
    catch (e) {
        next(e);
    }
}));
router.patch("/update/:resId", web_token_validator_1.validateWebToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = res.locals.tokenId;
        const restId = req.params.resId;
        const update = req.body;
        const result = yield restaurants_services_1.default.updateRes(id, restId, { _id: restId }, { $set: update });
        res.send(new Response_handler_1.RESPONSE_HANDLER(result));
    }
    catch (e) {
        next(e);
    }
}));
router.patch("/addBranch/:id", web_token_validator_1.validateWebToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = res.locals.tokenId;
        const restId = req.params.id;
        const update = req.body;
        const result = yield restaurants_services_1.default.updateBranch(id, restId, { _id: restId }, { $push: update });
        res.send(new Response_handler_1.RESPONSE_HANDLER(result));
    }
    catch (e) {
        next(e);
    }
}));
router.patch("/manage_approval/:rest_id", web_token_validator_1.validateWebToken, (0, check_role_1.checkRole)(["641988a2c3bac1ad2f2db6e4"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield restaurants_services_1.default.approveRestaurant({ _id: req.params.rest_id }, { $set: req.body });
        res.send(new Response_handler_1.RESPONSE_HANDLER(result));
    }
    catch (e) {
        next(e);
    }
}));
router.delete("/:id", web_token_validator_1.validateWebToken, (0, check_role_1.checkRole)(["641988a2c3bac1ad2f2db6e4", "641988d1c3bac1ad2f2db6e8"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield restaurants_services_1.default.deleteOne({ _id: new mongoose_1.default.Types.ObjectId((req.params.id).toString()) });
        res.send(new Response_handler_1.RESPONSE_HANDLER(result));
    }
    catch (e) {
        next(e);
    }
}));
router.get("/:id", web_token_validator_1.validateWebToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = res.locals.tokenId;
        const result = yield restaurants_services_1.default.findRes({ _id: new mongoose_1.default.Types.ObjectId((req.params.id).toString()) });
        console.log(result === null || result === void 0 ? void 0 : result.ownerId);
        console.log(result);
        if ((_a = result === null || result === void 0 ? void 0 : result.ownerId) === null || _a === void 0 ? void 0 : _a.equals(new mongoose_1.default.Types.ObjectId((id).toString()))) {
            res.send(new Response_handler_1.RESPONSE_HANDLER(result));
        }
        else {
            throw { "message": "UnAuthorized User", "statusCode": 404 };
        }
    }
    catch (e) {
        next(e);
    }
}));
// {
//   "official_name":"Mejwani",
//   "location":"Pune",
//   "menu":{
//     "Speciality":["Daal-Dokli","Rasmalai"],
//     "rotis":["Naan", "Kulcha", "Roti"]
//   },
//   "capacity":100
// }
exports.default = router;
