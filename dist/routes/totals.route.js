"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const totals_controller_1 = require("../controllers/totals.controller");
//router.get("/", getAllDataFromAllFranchises)
router.post("/", totals_controller_1.importAllCsvDataFromDirName);
router.get("/", totals_controller_1.getDataFromDateRangeAndFranchise);
router.get("/franchises", totals_controller_1.getAllFranchises);
router.post("/franchises", totals_controller_1.createNewFranchise);
exports.default = router;
