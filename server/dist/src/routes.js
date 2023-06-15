"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authHandler_1 = require("./handlers/authHandler");
const getUser_1 = require("./utils/getUser");
const router = (0, express_1.Router)();
router.route('/')
    .get((req, res) => { res.json({ status: "success", username: "not specified" }); });
router.route('/api/oauth/google')
    .get(authHandler_1.loginHandler);
router.route('/api/users')
    .get(getUser_1.getUser);
exports.default = router;
