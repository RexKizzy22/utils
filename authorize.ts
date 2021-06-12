// import jwt from 'jsonwebtoken';
// import { Request, Response, NextFunction } from 'express';
// import User from '../Model/user';

export async function authorize(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.headers.authorization) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid headers',
        data: [],
      });
    }
    const token: string = req.headers.authorization.split(' ')[1];
    const decodedToken = <any>jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    if (!decodedToken) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid token',
        data: [],
      });
    }

    const { userID } = decodedToken;
    const data = await User.findById(userID).lean().exec();

    if (!data) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid token',
        data: [],
      });
    }

    req.currentUser = decodedToken.userID as string;

    return next();
  } catch (error) {
    console.log(error)
    if (error.message && error.message.includes('jwt')) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid token',
        data: [],
      });
    }
    return res.status(500).json({
      status: 'error',
      message: 'An unknown error occurred',
      data: [],
    });
  }
}
