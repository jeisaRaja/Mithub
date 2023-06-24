"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkReqUser(req, res) {
    if (!req.session.user) {
        res.json({ msg: "there is no req user" });
    }
    res.json(req.session.user);
}
exports.default = checkReqUser;
