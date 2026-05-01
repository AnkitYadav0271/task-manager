import userModel from "../models/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import type { Response, Request } from "express";

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "email and password are required" });
  }

  console.log("logging reqBody", req.body);
  const isUserExists = await userModel.findOne({ email }).select("+password");
  if (!isUserExists) {
    return res.status(400).json({
      success: false,
      message: "User with this email does not exist please register",
    });
  }

  console.log("Logging is user Exists:", isUserExists);

  try {
    let compare = await bcrypt.compare(password, isUserExists.password);
    if (!compare) {
      return res
        .status(400)
        .json({ success: false, message: "Email or Password is Incorrect" });
    }

    console.log("logging compare :", compare);

    let token;
    const JWT_SECRET = process.env.JWT_SECRET;
    if (JWT_SECRET) {
      token = await jwt.sign({ user: isUserExists }, JWT_SECRET, {
        expiresIn: "30d",
      });
    }

    console.log("Logging token :", token);

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV === "production" ? true : false,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "strict",
      maxAge: 360000,
    });

    return res.status(200).json({
      success: true,
      message: "user LoggedIn Success Fully",
      token,
      user: {
        name: isUserExists.fullName,
        email: isUserExists.email,
        id: isUserExists._id,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};
