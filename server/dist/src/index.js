"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routes_js_1 = __importDefault(require("./routes.js"));
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const express_session_1 = __importDefault(require("express-session"));
const connect_pg_simple_1 = __importDefault(require("connect-pg-simple"));
const server = (0, express_1.default)();
server.use(express_1.default.json());
// SESSION STORE
const PostgresqlStore = (0, connect_pg_simple_1.default)(express_session_1.default);
const sessionStore = new PostgresqlStore({
    conString: `postgres://${process.env.DB_Username}:${process.env.DB_Password}@localhost:5432/calendly`,
});
server.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 900000,
    },
    store: sessionStore
}));
server.use('/', routes_js_1.default);
server.listen(5000, () => {
    console.log("Listening in port 5000");
});
