import { Request, Response } from "express";
import mongoose from "mongoose";
import Ticket from "../models/Ticket";
import Event from "../models/Event";
import User from "../models/User";

const createTicket = (req: Request, res: Response) => {
  const name = req.body.name;
  const type = req.body.type;
  const price = req.body.price;
  const date = req.body.date;
  const eventId = req.body.eventId;
  const userId = req.body.userId;

  const ticket = new Ticket({
    _id: new mongoose.Types.ObjectId(),
    name,
    type,
    price,
    date,
    eventId,
    userId
  });

  User.findById(userId)
  .then((user) => {
    if(user) {
        user.events.push(eventId);
        user.tickets.push(ticket._id.valueOf());
        user.save().catch((error) => res.status(500).json({ error }));
    } else {
        return res.status(404).json({ message: "user not found" });
    }
  })

  Event.findById(eventId)
    .then((event) => {
      if (event) {
        event.participants.push(userId);
        event.save().catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(404).json({ message: "event not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));

  return ticket
    .save()
    .then((ticket) => res.status(201).json({ ticket }))
    .catch((error) => res.status(500).json({ error }));
};

const readTicket = (req: Request, res: Response) => {
  const ticketId = req.params.ticketId;

  return Ticket.findById(ticketId)
    .then((ticket) =>
      ticket
        ? res.status(200).json({ ticket })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response) => {
  return Ticket.find()
    .then((tickets) => res.status(200).json({ tickets }))
    .catch((error) => res.status(500).json({ error }));
};

const updateTicket = (req: Request, res: Response) => {
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
        return res.status(404).json({ message: "not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteTicket = (req: Request, res: Response) => {
  const ticketId = req.params.ticketId;

  return Ticket.findByIdAndDelete(ticketId)
    .then((ticket) =>
      ticket
        ? res.status(201).json({ ticket, message: "Deleted" })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createTicket,
  readTicket,
  readAll,
  updateTicket,
  deleteTicket,
};
