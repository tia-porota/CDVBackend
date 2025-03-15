import { processAllCsvFilesFromDir } from "./csvlister";
import { iCsv } from "./types";
export const parseToDb = async (path: string, franchiseId: number) : Promise<string> => {
  let stringQuery: string =
    "INSERT INTO entries_exits(franchise_id,date,hour,entries,exits) VALUES";
  const result = await processAllCsvFilesFromDir(path, true);
  result.map((single) => {
    for (const data of single) {
      let aux = `(${franchiseId},'${data.day}',${data.hour},${data.entries},${data.exits}),`;
      stringQuery+=aux;
    }
  });
  //console.log(stringQuery.replace(/.$/,';'));
  return stringQuery.replace(/.$/,';');
};
const path = "./data/test/";
//parseToDb(path, 1);
