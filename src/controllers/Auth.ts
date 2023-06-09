import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User';
import controller from '../controllers/User';

const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get user input
        const { username, email, password, role } = req.body;
    
        // Validate user input
        if (!(email && password && username && role)) {
          res.status(400).send("All input is required");
        }
    
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });
    
        if (oldUser) {
          return res.status(409).send("User Already Exist. Please Login");
        }
    
        //Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);
        console.log(encryptedPassword);
        req.body.password = encryptedPassword;
    
        // Create user in our database
        const user: any = await controller.createUser(req, res, next);
    
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY ?? "",
          {
            expiresIn: "2h",
          }
        );
        // save user token
        user.token = token;
    
        // return new user
        res.status(201).json(user);
      } catch (err) {
        console.log(err);
      }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY ?? "",
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
};

export default { register, login };