"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertUser = exports.getUserbyEmail = exports.getUser = void 0;
const getUser = "SELECT * FROM Users;";
exports.getUser = getUser;
const getUserbyEmail = "SELECT * FROM Users WHERE email = $1;";
exports.getUserbyEmail = getUserbyEmail;
const insertUser = "INSERT INTO users (name, email, picture) VALUES ($1,$2,$3) RETURNING id;";
exports.insertUser = insertUser;
