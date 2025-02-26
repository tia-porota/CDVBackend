import express from 'express';

const app = express();

app.listen(process.env.EXPRESS_PORT);
console.log(process.env.EXPRESS_PORT)

