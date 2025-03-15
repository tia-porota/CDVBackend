import { parseCsv } from "./csvparser";
import { iCsv } from "./types";
const fs = require("fs");
//const path: string = "./data/mdp/";

const listAllCsvFilesFromDir = (path: string): String[] => {
  const result: String[] = fs.readdirSync(path);
  return result.filter((single) => single.endsWith(".csv"));
};

const moveFileToDoneDir = (path:string,fileName:String) => {
    fs.rename(path+fileName,path+"done/"+fileName,()=>{})
};


export const processAllCsvFilesFromDir = async (path: string, test?:boolean) => {
  const files: String[] = listAllCsvFilesFromDir(path);
  const data = [];

  for (const file of files) {
    const result = await parseCsv(path + file);
    data.push(result);
    if (!test) moveFileToDoneDir(path,file); //else console.log(data); 
    
  }
  
  return data;
};

//console.log(listAllCsvFilesFromDir(path));
//processAllCsvFilesFromDir("./data/test/",true);
