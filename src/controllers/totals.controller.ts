import express from "express";
import { db } from "../database/db";
import { parseToDb } from "../utils/dbparser";
export const getAllFranchises = async (
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { rows } = await db.query("SELECT * FROM franchises");
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

export const importAllCsvDataFromDirName = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
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
    next(err);
  }
};

export const getAllDataFromAllFranchises = async (
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { rows } = await db.query(
      "SELECT f.displayName, ee.date, ee.hour, ee.entries, ee.exits FROM entries_exits as ee LEFT JOIN franchises as f ON f.id = ee.franchise_id;"
    );
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

export const getDataFromDateRangeAndFranchise = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { dirName, dateFrom, dateUntil } = req.query;
    const franchise = await db.query(
      "SELECT * FROM franchises WHERE dirName = $1 LIMIT 1",
      [dirName]
    );

    const { rows } = await db.query(
      "SELECT f.displayName, ee.date, ee.hour, ee.entries, ee.exits FROM entries_exits as ee LEFT JOIN franchises as f ON f.id = ee.franchise_id WHERE ee.date BETWEEN $2 AND $3 AND f.id = $1;",
      [franchise.rows[0].id, dateFrom, dateUntil]
    );
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

export const createNewFranchise = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { dirName, displayName } = req.body;
    const { rows } = await db.query(
      "INSERT INTO franchises(dirname,displayname) VALUES($1,$2);",
      [dirName, displayName]
    );
    res.status(200).json(rows);
  } catch (err) {
    next(err);
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
