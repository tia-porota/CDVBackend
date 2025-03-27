import express from "express";
const router = express.Router();

import { createNewFranchise, getAllDataFromAllFranchises, getAllFranchises, getDataFromDateRangeAndFranchise, importAllCsvDataFromDirName } from "../controllers/totals.controller";

//router.get("/", getAllDataFromAllFranchises)
router.post("/", importAllCsvDataFromDirName);
router.get("/",getDataFromDateRangeAndFranchise)
router.get("/franchises", getAllFranchises);
router.post("/franchises", createNewFranchise);



export default router;
