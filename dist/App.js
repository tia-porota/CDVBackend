"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const totals_route_1 = __importDefault(require("./routes/totals.route"));
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/v1/data", totals_route_1.default);
app.use(errorHandler_1.errorHandler);
app.listen(process.env.EXPRESS_PORT);
console.log(process.env.EXPRESS_PORT);
