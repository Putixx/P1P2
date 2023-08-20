import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import controller from '../controllers/User';
import Logging from '../library/Logging';

const register = async (req: Request, res: Response) => {
    try {
        // Get user email
        const email = req.body.email;
    
        // Validate user input
        if (!(req.body.email && req.body.password && req.body.username && req.body.role)) {
          return res.status(400).send("All input is required");
        }
    
        // Validate if user exist in database
        const oldUser = await User.findOne({ email });
    
        if (oldUser) {
          return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        req.body.password = await bcrypt.hash(req.body.password, 10);

        // Create user in database
        const userId: string = controller.createUser(req, res);

        // Create token
        const token = jwt.sign(
          { user_id: userId, email },
          process.env.TOKEN_KEY ?? "",
          {
            expiresIn: "2h",
          }
        );

        // save user token
        controller.saveUserToken(userId, token);

      } catch (error) {
        Logging.error(error);
      }
};

const login = async (req: Request, res: Response) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email }).select('+password +token');
    
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
      user.password = "";

      // user
      return res.status(200).json(user);
    }
    return res.status(400).send("Invalid Credentials");
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default { register, login };