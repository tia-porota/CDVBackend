const csv = require("csv-parser");
const fs = require("fs");
import {iCsv} from './types'
//const path: string = "./data/mdp/test.csv";

interface CsvRow {
  [key: string]: string;
}

const readCsv = (path: string): Promise<CsvRow[]> => {
  return new Promise((resolve, _rejection) => {
    const results: CsvRow[] = [];
    fs.createReadStream(path, { encoding: "utf8" })
      .pipe(csv())
      .on("data", (data: any) => results.push(data))
      .on("end", () => {
        resolve(results);
      });
  });
};

const formateDate = (date: string): string => {
  const newDate: Date = new Date(date);
  newDate.setHours(newDate.getHours() - 3);
  return newDate.toISOString().split("T")[0];
};

export const parseCsv = async (path: string,test?:boolean) => {

  try{
  const franchise: string = path.split("/")[path.split("/").length - 2];
  const data = await readCsv(path);
  const parsedData = data.map((single, key) => ({
    franchise,
    day: formateDate(single.Hora),
    hour: key,
    entries: Number(single["Núm. entradas"]),
    exits: Number(single["No. Salida"]),
  
  }));
  if(test) console.log(parsedData); 
  return parsedData;
}
catch(err){
  throw new Error("Error al parsear el archivo CSV");
}
};
//parseCsv("./data/test/test.csv",true)
//console.log(parseCsv(path));