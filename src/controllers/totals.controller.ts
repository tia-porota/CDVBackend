import express from "express";
import { db } from "../database/db";
import { parseToDb } from "../utils/dbparser";
export const getAllFranchises = async (
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) => {
  try {
    const { rows } = await db.query("SELECT * FROM franchises");
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

export const importAllCsvDataFromDirName = async (
  req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) => {
  try {
    const { dirName } = req.body;
    const { rows } = await db.query(
      "SELECT * FROM franchises WHERE dirName = $1 LIMIT 1",
      [dirName]
    );
    const id: number = rows[0].id;
    const path = process.env.DATA_PATH + dirName + "/";
    const result = await parseToDb(path, id);

    await db.query(result);

    res.status(201).send(result);
  } catch (err) {
    res.sendStatus(500).send(err);
  }
};

export const getAllDataFromAllFranchises = async (
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) => {
  try {
    const { rows } = await db.query(
      "SELECT f.displayName, ee.date, ee.hour, ee.entries, ee.exits FROM entries_exits as ee LEFT JOIN franchises as f ON f.id = ee.franchise_id;"
    );
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};
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
