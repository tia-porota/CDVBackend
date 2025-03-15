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
exports.parseToDb = void 0;
const csvlister_1 = require("./csvlister");
const parseToDb = (path, franchiseId) => __awaiter(void 0, void 0, void 0, function* () {
    let stringQuery = "INSERT INTO entries_exits(franchise_id,date,hour,entries,exits) VALUES";
    const result = yield (0, csvlister_1.processAllCsvFilesFromDir)(path, true);
    result.map((single) => {
        for (const data of single) {
            let aux = `(${franchiseId},'${data.day}',${data.hour},${data.entries},${data.exits}),`;
            stringQuery += aux;
        }
    });
    //console.log(stringQuery.replace(/.$/,';'));
    return stringQuery.replace(/.$/, ';');
});
exports.parseToDb = parseToDb;
const path = "./data/test/";
//parseToDb(path, 1);
