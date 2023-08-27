import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import Logging from '../library/Logging';
import { IEvent } from '../models/Event';

export const ValidateJoi = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            Logging.error(error);

            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    event: {
        create: Joi.object<IEvent>({
            name: Joi.string().required(),
            type: Joi.string().required(),
            owner: Joi.string().required(),
            street: Joi.string().required(),
            city: Joi.string().required(),
            description: Joi.string().required(),
            startDate: Joi.date().min(new Date()).required(),
            endDate: Joi.date().min(Joi.ref('startDate')).required(),
            image: Joi.string(),
            latitude: Joi.number(),
            longitude: Joi.number(),
            participants: Joi.array(),
            price: Joi.number().required(),
            isPromoted: Joi.boolean().required()
        }),
        update: Joi.object<IEvent>({
            name: Joi.string(),
            type: Joi.string(),
            owner: Joi.string(),
            street: Joi.string(),
            city: Joi.string(),
            description: Joi.string(),
            startDate: Joi.date().min(new Date()),
            endDate: Joi.date().min(Joi.ref('startDate')),
            image: Joi.string(),
            latitude: Joi.number(),
            longitude: Joi.number(),
            participants: Joi.array(),
            price: Joi.number(),
            isPromoted: Joi.boolean()
        })
    }
};