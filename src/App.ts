import express from "express";
import cors from "cors";
import routeTotals from './routes/totals.route'
import { errorHandler } from "./middleware/errorHandler";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/data",routeTotals)

app.use(errorHandler)

app.listen(process.env.EXPRESS_PORT);
console.log(process.env.EXPRESS_PORT);
