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
const getOAuthToken_1 = require("../utils/getOAuthToken");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function getUserFromToken(token) {
    var _a, _b;
    const decoded = jsonwebtoken_1.default.decode(token);
    const user = {
        name: (_a = decoded === null || decoded === void 0 ? void 0 : decoded.name) !== null && _a !== void 0 ? _a : ' ',
        email: (_b = decoded === null || decoded === void 0 ? void 0 : decoded.email) !== null && _b !== void 0 ? _b : ' ',
        picture: decoded === null || decoded === void 0 ? void 0 : decoded.picture
    };
    console.log(user);
    return user;
}
function loginHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const code = req.query.code;
        const { id_token, access_token } = yield (0, getOAuthToken_1.getOAuthToken)(code);
        console.log({ id_token, access_token });
        const user = getUserFromToken(id_token);
        res.json({
            user: user,
        });
    });
}
exports.default = loginHandler;
