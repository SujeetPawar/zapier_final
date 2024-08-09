import express, { Router } from "express";
import { authMiddleware } from "../middleware";

import { prismaClient } from "../db";

const router = express.Router();


router.get("/available" , async(req , res)=>{
    const availableActions = await prismaClient.availableAction.findMany({})
    res.json({
        availableActions
    })
})

export const actionRouter = router;