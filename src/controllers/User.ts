import { Request, Response } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import Logging from '../library/Logging';

const createUser = (req: Request, res: Response) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password
    const image = req.body.image;
    const events = req.body.events;
    const tickets = req.body.tickets;
    const role = req.body.role;

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username,
        email,
        password,
        image,
        events,
        tickets,
        role
    });

    user.save()
        .then((user) => {
            user.password = '';
            res.status(201).json({ user })
        })
        .catch((error) => res.status(500).json({ error }));

    return user._id.valueOf();
};

const readUser = (req: Request, res: Response) => {
    const userId = req.params.userId;

    return User.findById(userId)
        .then((user) => {
            user ? res.status(200).json({ user }) : res.status(404).json({ message: 'not found' })
        })
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response) => {
    return User.find()
        .then((users) => res.status(200).json({ users }))
        .catch((error) => res.status(500).json({ error }));
};

const updateUser = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    if(req.body.password){
        console.log("password")
        req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    return User.findOneAndUpdate({_id: userId}, {$set: req.body}, {upsert: true, new: true})
        .catch((error) => console.log(error));
};

const saveUserToken = (userId: string, token: string) => {
    return User.findById(userId)
        .then((user) => {
            if (user) {
                user.token = token;
                user.set(user);

                return user
                    .save()
                    .then((user) => Logging.info(user))
                    .catch((error) => Logging.error(error));
            } else {
                Logging.error('not found');
            }
        })
        .catch((error) => Logging.error(error));
};

const deleteUser = (req: Request, res: Response) => {
    const userId = req.params.userId;

    return User.findByIdAndDelete(userId)
        .then((user) => (user ? res.status(201).json({ user, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createUser, readUser, readAll, updateUser, deleteUser, saveUserToken };