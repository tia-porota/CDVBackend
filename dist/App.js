"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const totals_route_1 = __importDefault(require("./routes/totals.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v1/data", totals_route_1.default);
app.listen(process.env.EXPRESS_PORT);
console.log(process.env.EXPRESS_PORT);
