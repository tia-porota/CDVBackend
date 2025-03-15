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
exports.processAllCsvFilesFromDir = void 0;
const csvparser_1 = require("./csvparser");
const fs = require("fs");
//const path: string = "./data/mdp/";
const listAllCsvFilesFromDir = (path) => {
    const result = fs.readdirSync(path);
    return result.filter((single) => single.endsWith(".csv"));
};
const moveFileToDoneDir = (path, fileName) => {
    fs.rename(path + fileName, path + "done/" + fileName, () => { });
};
const processAllCsvFilesFromDir = (path, test) => __awaiter(void 0, void 0, void 0, function* () {
    const files = listAllCsvFilesFromDir(path);
    const data = [];
    for (const file of files) {
        const result = yield (0, csvparser_1.parseCsv)(path + file);
        data.push(result);
        if (!test)
            moveFileToDoneDir(path, file); //else console.log(data); 
    }
    return data;
});
exports.processAllCsvFilesFromDir = processAllCsvFilesFromDir;
//console.log(listAllCsvFilesFromDir(path));
//processAllCsvFilesFromDir("./data/test/",true);
