"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authHandler_1 = require("./handlers/authHandler");
const getUser_1 = require("./utils/getUser");
const checkReqUser_1 = __importDefault(require("./handlers/checkReqUser"));
const router = (0, express_1.Router)();
router.route('/')
    .get((req, res) => { res.json({ status: "success", username: "not specified" }); });
router.route('/api/oauth/google')
    .get(authHandler_1.loginHandler);
router.route('/api/users')
    .get(getUser_1.getUser);
router.route('/api/checkReqUser')
    .get(checkReqUser_1.default);
exports.default = router;
