import express, { Router } from "express";
import { authMiddleware } from "../middleware";
import { SigninSchema, SignupSchema } from "../types";
import { prismaClient } from "../db";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const body = req.body;
  const parsedData = SignupSchema.safeParse(body);

  if (!parsedData.success) {
    return res.status(411).json({
      msg: "Incorrect Inputs",
    });
  }

  const userExits = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.username,
    },
  });

  if (userExits) {
    return res.status(403).json({
      msg: "user already exits",
    });
  }

  await prismaClient.user.create({
    data: {
      name: parsedData.data.name,
      email: parsedData.data.username,
      password: parsedData.data.password,
      //to store password hashed in database
    },
  });

  // await sendEmail()

  return res.json({
    msg: "Please verify your account",
  });
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  const parsedData = SigninSchema.safeParse(body);

  if (!parsedData.success) {
    return res.status(411).json({
      msg: "Incorrect Inputs",
    });
  }

  const user = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.username,
      //hashed paswword agian
      password: parsedData.data.password,
    },
  });

  if (!user) return res.status(403).json({ msg: "User Not found" });

  const token = jwt.sign(
    {
      id: user.id,
    },
    JWT_PASSWORD
  );

  res.json({
    token: token,
  });
});

router.get("/", authMiddleware, async (req, res) => {
  //@ts-ignore
  const id = req.id;
  const user = await prismaClient.user.findFirst({
    where: {
      id,
    },
    select: {
      name: true,
      email: true,

    },
  });
  return res.json({
    user,
  });
});

export const userRouter = router;
