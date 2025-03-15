import express from "express";
const router = express.Router();

import { getAllDataFromAllFranchises, getAllFranchises, importAllCsvDataFromDirName } from "../controllers/totals.controller";

router.get("/", getAllDataFromAllFranchises)
router.post("/", importAllCsvDataFromDirName);
router.get("/franchises", getAllFranchises);



export default router;
