"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewFranchise = exports.getDataFromDateRangeAndFranchise = exports.getAllDataFromAllFranchises = exports.importAllCsvDataFromDirName = exports.getAllFranchises = void 0;
const db_1 = require("../database/db");
const dbparser_1 = require("../utils/dbparser");
const getAllFranchises = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows } = yield db_1.db.query("SELECT * FROM franchises");
        res.status(200).json(rows);
    }
    catch (err) {
        next(err);
    }
});
exports.getAllFranchises = getAllFranchises;
const importAllCsvDataFromDirName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { dirName } = req.body;
        const { rows } = yield db_1.db.query("SELECT * FROM franchises WHERE dirName = $1 LIMIT 1", [dirName]);
        const id = rows[0].id;
        const path = process.env.DATA_PATH + dirName + "/";
        const result = yield (0, dbparser_1.parseToDb)(path, id);
        yield db_1.db.query(result);
        res.status(201).send(result);
    }
    catch (err) {
        next(err);
    }
});
exports.importAllCsvDataFromDirName = importAllCsvDataFromDirName;
const getAllDataFromAllFranchises = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows } = yield db_1.db.query("SELECT f.displayName, ee.date, ee.hour, ee.entries, ee.exits FROM entries_exits as ee LEFT JOIN franchises as f ON f.id = ee.franchise_id;");
        res.status(200).json(rows);
    }
    catch (err) {
        next(err);
    }
});
exports.getAllDataFromAllFranchises = getAllDataFromAllFranchises;
const getDataFromDateRangeAndFranchise = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { dirName, dateFrom, dateUntil } = req.query;
        const franchise = yield db_1.db.query("SELECT * FROM franchises WHERE dirName = $1 LIMIT 1", [dirName]);
        const { rows } = yield db_1.db.query("SELECT f.displayName, ee.date, ee.hour, ee.entries, ee.exits FROM entries_exits as ee LEFT JOIN franchises as f ON f.id = ee.franchise_id WHERE ee.date BETWEEN $2 AND $3 AND f.id = $1;", [franchise.rows[0].id, dateFrom, dateUntil]);
        res.status(200).json(rows);
    }
    catch (err) {
        next(err);
    }
});
exports.getDataFromDateRangeAndFranchise = getDataFromDateRangeAndFranchise;
const createNewFranchise = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { dirName, displayName } = req.body;
        const { rows } = yield db_1.db.query("INSERT INTO franchises(dirname,displayname) VALUES($1,$2);", [dirName, displayName]);
        res.status(200).json(rows);
    }
    catch (err) {
        next(err);
    }
});
exports.createNewFranchise = createNewFranchise;
/*

export const getAllFranchises = async (_req:express.Request,res:express.Response,_next:express.NextFunction) => {
    try {
        const { rows } = await db.query("SELECT * FROM franchises");
        res.status(200).json(rows);
      } catch (err) {
        res.status(500).send("Internal Server Error");
      }
}
*/
