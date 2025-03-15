import pg from "pg";
let port: number;
if (process.env.PG_PORT != undefined) {
  port = Number(process.env.PG_PORT);
} else throw new Error("Invalid PG_PORT. Check .env");

export const db: pg.Pool = new pg.Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: port,
  database: process.env.PG_DATABASE,
});
