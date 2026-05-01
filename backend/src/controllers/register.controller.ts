import type { Request, Response } from "express";
import userModel from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerController = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "all fields are required" });
  }

  const isEmailTaken = await userModel.findOne({ email });
  console.log("logging is email taken :", isEmailTaken);
  if (isEmailTaken) {
    return res
      .status(409)
      .json({ success: false, message: "Email already taken" });
  }

  let hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    let token;

    const secret = process.env.JWT_SECRET;
    if (secret) {
      token = await jwt.sign({ user: newUser }, secret, {
        expiresIn: "30d",
      });
    }

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV === "production" ? true : false,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "strict",
      maxAge: 360000,
    });

    return res.status(201).json({
      success: true,
      user: { id: newUser._id, email: newUser.email, token },
      message: "user register successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error ",
      error: error,
    });
  }
};
