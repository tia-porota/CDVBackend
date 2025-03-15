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
exports.parseCsv = void 0;
const csv = require("csv-parser");
const fs = require("fs");
const readCsv = (path) => {
    return new Promise((resolve, _rejection) => {
        const results = [];
        fs.createReadStream(path, { encoding: "utf8" })
            .pipe(csv())
            .on("data", (data) => results.push(data))
            .on("end", () => {
            resolve(results);
        });
    });
};
const formateDate = (date) => {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() - 3);
    return newDate.toISOString().split("T")[0];
};
const parseCsv = (path, test) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const franchise = path.split("/")[path.split("/").length - 2];
        const data = yield readCsv(path);
        const parsedData = data.map((single, key) => ({
            franchise,
            day: formateDate(single.Hora),
            hour: key,
            entries: Number(single["Núm. entradas"]),
            exits: Number(single["No. Salida"]),
        }));
        if (test)
            console.log(parsedData);
        return parsedData;
    }
    catch (err) {
        throw new Error("Error al parsear el archivo CSV");
    }
});
exports.parseCsv = parseCsv;
//parseCsv("./data/test/test.csv",true)
//console.log(parseCsv(path));
