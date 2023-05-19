"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const roles_schema_1 = require("./roles.schema");
const createRole = (role) => roles_schema_1.RoleModel.create(role);
const deleteRole = (id) => roles_schema_1.RoleModel.updateOne({
    _id: new mongoose_1.Types.ObjectId(id)
}, {
    isDeleted: true
});
exports.default = {
    createRole,
    deleteRole
};
