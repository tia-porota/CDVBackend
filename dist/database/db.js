"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const pg_1 = __importDefault(require("pg"));
let port;
if (process.env.PG_PORT != undefined) {
    port = Number(process.env.PG_PORT);
}
else
    throw new Error("Invalid PG_PORT. Check .env");
exports.db = new pg_1.default.Pool({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: port,
    database: process.env.PG_DATABASE,
});
