"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
require("dotenv/config");
const pool = new pg_1.Pool({
    host: process.env.DB_Host,
    port: parseInt(process.env.DB_Port),
    database: process.env.DB_Database,
    user: process.env.DB_Username,
    password: process.env.DB_Password,
});
exports.default = pool;
