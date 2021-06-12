// import { Request, Response } from "express";
// import User from "../Model/user";
// import {
//   authSignup,
//   hashPassword,
//   generateToken,
//   authLogin,
//   comparePassword,
// } from "../Auth/auth";

export async function signup(
  req: Request,
  res: Response
): Promise<Response | void> {
  try {
    const { error } = authSignup(req.body);

    if (error) {
      return res.status(400).json(error.message);
    }

    const hashedPassword = hashPassword(req.body.password);

    const user = new User({
      email: req.body.email,
      password: hashedPassword,
      name: req.body.name,
    });

    const data = await user.save();

    const token = generateToken(data._id);
    return res.status(201).json({
      status: "success",
      message: "successful",
      data,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: "could not save",
      data: [],
    });
  }
}

export async function login(
  req: Request,
  res: Response
): Promise<Response | void> {
  try {
    const { error } = authLogin(req.body);
    if (error) {
      return res.status(400).json({
        status: "error",
        message: error.details[0].message,
        data: [],
      });
    }

    const emailExist = await User.findOne({ email: req.body.email })
      .lean()
      .exec();
    if (!emailExist) {
      return res.status(500).json({
        status: "error",
        message: "invalid email or password",
        data: [],
      });
    }

    if (!comparePassword(emailExist.password, req.body.password)) {
      return res.status(500).json({
        status: "error",
        message: "invalid email or password",
        data: [],
      });
    }

    req.currentUser = emailExist._id as string;
    const token = generateToken(emailExist._id);

    return res.status(200).json({
      status: "success",
      message: "successful",
      data: emailExist,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "An unknown error occurred",
      data: [],
    });
  }
}
