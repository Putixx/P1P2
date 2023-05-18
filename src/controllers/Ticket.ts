import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Ticket from '../models/Ticket';

const createTicket = (req: Request, res: Response, next: NextFunction) => {
    const name = req.body.name;
    const type = req.body.type;
    const price = req.body.price;
    const date = req.body.date;
    const event = req.body.event;

    const ticket = new Ticket({
        _id: new mongoose.Types.ObjectId(),
        name,
        type,
        price,
        date,
        event
    });

    return ticket
        .save()
        .then((ticket) => res.status(201).json({ ticket }))
        .catch((error) => res.status(500).json({ error }));
};

const readTicket = (req: Request, res: Response, next: NextFunction) => {
    const ticketId = req.params.ticketId;

    return Ticket.findById(ticketId)
        .then((ticket) => (ticket ? res.status(200).json({ ticket }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Ticket.find()
        .then((tickets) => res.status(200).json({ tickets }))
        .catch((error) => res.status(500).json({ error }));
};

const updateTicket = (req: Request, res: Response, next: NextFunction) => {
    const ticketId = req.params.ticketId;

    return Ticket.findById(ticketId)
        .then((ticket) => {
            if (ticket) {
                ticket.set(req.body);

                return ticket
                    .save()
                    .then((ticket) => res.status(201).json({ ticket }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteTicket = (req: Request, res: Response, next: NextFunction) => {
    const ticketId = req.params.ticketId;

    return Ticket.findByIdAndDelete(ticketId)
        .then((ticket) => (ticket ? res.status(201).json({ ticket, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createTicket, readTicket, readAll, updateTicket, deleteTicket };