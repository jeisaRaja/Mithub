"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginHandler_1 = __importDefault(require("./handlers/loginHandler"));
const router = (0, express_1.Router)();
router.route('/')
    .get((req, res) => {
    res.json({
        status: "success",
        username: "not specified"
    });
});
router.route('/api/oauth/google')
    .get(loginHandler_1.default);
exports.default = router;
