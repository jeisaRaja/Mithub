"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const database_1 = __importDefault(require("./database"));
function getUser(req, res) {
    database_1.default.query("SELECT * FROM USERS", (error, results) => {
        if (error)
            throw error;
        res.status(200).json(results.rows);
    });
}
exports.getUser = getUser;
