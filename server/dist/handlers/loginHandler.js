"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function loginHandler(req, res) {
    const code = req.query.code;
    res.json({
        code: code,
    });
}
exports.default = loginHandler;
