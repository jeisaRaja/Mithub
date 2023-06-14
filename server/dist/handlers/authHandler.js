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
exports.loginHandler = void 0;
const getOAuthToken_1 = require("../utils/getOAuthToken");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = __importDefault(require("../utils/database"));
const queries_1 = require("./queries");
function getUserFromToken(token) {
    var _a, _b;
    const decoded = jsonwebtoken_1.default.decode(token);
    const user = {
        name: (_a = decoded === null || decoded === void 0 ? void 0 : decoded.name) !== null && _a !== void 0 ? _a : ' ',
        email: (_b = decoded === null || decoded === void 0 ? void 0 : decoded.email) !== null && _b !== void 0 ? _b : ' ',
        picture: decoded === null || decoded === void 0 ? void 0 : decoded.picture
    };
    return user;
}
function loginHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const code = req.query.code;
        const { id_token, access_token } = yield (0, getOAuthToken_1.getOAuthToken)(code);
        const googleUser = getUserFromToken(id_token);
        const email = googleUser.email;
        const client = yield database_1.default.connect();
        try {
            yield client.query("BEGIN");
            const isUserExist = yield client.query(queries_1.getUserbyEmail, [email]);
            if (isUserExist.rowCount === 0) {
                const newInsertedUser = yield client.query(queries_1.insertUser, [googleUser.name, googleUser.email, googleUser.picture]);
                yield client.query('COMMIT');
                return res.json(newInsertedUser);
            }
            res.json(isUserExist.rows);
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.loginHandler = loginHandler;
