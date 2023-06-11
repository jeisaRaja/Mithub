"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routes_js_1 = __importDefault(require("./routes.js"));
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const pg_1 = require("pg");
const client = new pg_1.Client();
const server = (0, express_1.default)();
server.use(express_1.default.json());
server.get('/', (req, res) => {
    return res.send('Hello World!');
});
server.use('/', routes_js_1.default);
server.listen(5000, () => {
    console.log("Listening in port 5000");
});
