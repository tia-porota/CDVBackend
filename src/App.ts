import express from "express";

import routeTotals from './routes/totals.route'

const app = express();
app.use(express.json());

app.use("/api/v1/data",routeTotals)



app.listen(process.env.EXPRESS_PORT);
console.log(process.env.EXPRESS_PORT);
