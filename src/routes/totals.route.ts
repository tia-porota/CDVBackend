import express from "express";
const router = express.Router();

router.get("/", async (_req,res,_next)=>{
    
    res.status(200).json("hola:hola");
})

/*
router.get("/", async (_req,res,_next)=>{
    res.status(200).json("hola:hola");
})
*/
export default router;