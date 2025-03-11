import { parseCsv } from "./csvparser";
const fs = require("fs");
//const path: string = "./data/mdp/";

const listAllCsvFilesFromDir = (path: string): String[] => {
  const result: String[] = fs.readdirSync(path);
  return result.filter((single) => single.endsWith(".csv"));
};

const moveFileToDoneDir = (path:string,fileName:String) => {
    fs.rename(path+fileName,path+"done/"+fileName,()=>{})
};

export const processAllCsvFilesFromDir = async (path: string) => {
  const files: String[] = listAllCsvFilesFromDir(path);
  const data: Object[] = [];

  for (const file of files) {
    const result = await parseCsv(path + file);
    data.push(result);
    moveFileToDoneDir(path,file)
  }
  //console.log(data);
  return data;
};

//console.log(listAllCsvFilesFromDir(path));
//processAllCsvFilesFromDir(path);
