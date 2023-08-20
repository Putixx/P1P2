import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Event from '../models/Event';
import User from '../models/User';

const createEvent = (req: Request, res: Response) => {
    const name = req.body.name;
    const type = req.body.type;
    const owner = req.body.owner;
    const street = req.body.street;
    const city = req.body.city;
    const description = req.body.description;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const image = req.body.image;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const participants = req.body.participants;
    const price = req.body.price;
    const isPromoted = req.body.isPromoted;

    const event = new Event({
        _id: new mongoose.Types.ObjectId(),
        name,
        type,
        owner,
        street,
        city,
        description,
        startDate,
        endDate,
        image,
        latitude,
        longitude,
        participants,
        price,
        isPromoted,
    });

    return event
        .save()
        .then((event) => res.status(201).json({ event }))
        .catch((error) => res.status(500).json({ error }));
};

const readEvent = (req: Request, res: Response) => {
    const eventId = req.params.eventId;

    return Event.findById(eventId)
        .then((event) => (event ? res.status(200).json({ event }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readEventByType = (req: Request, res: Response) => {
    const eventType = req.params.eventType;

    return Event.find()
        .then((events) => {
            let filteredEvents = events.filter(e => e.type === eventType)
            filteredEvents ? res.status(200).json({ filteredEvents }) : res.status(404).json({ message: 'not found' })})
        .catch((error) => res.status(500).json({ error }));
};

const readEventParticipants = (req: Request, res: Response) => {
    const eventId = req.params.eventId;

    return Event.findById(eventId)
        .then((event) => {
            User.find()
            .then((users) => {
                const participants = users.filter((u: any) => event?.participants.includes(u))
                participants ? res.status(200).json({ participants }) : res.status(404).json({ message: 'not found' })
            })
            .catch((error) => res.status(500).json({ error }));
            })
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response) => {
    return Event.find()
        .then((events) => res.status(200).json({ events }))
        .catch((error) => res.status(500).json({ error }));
};

const updateEvent = (req: Request, res: Response) => {
    const eventId = req.params.eventId;

    return Event.findById(eventId)
        .then((event) => {
            if (event) {
                event.set(req.body);

                return event
                    .save()
                    .then((event) => res.status(201).json({ event }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteEvent = (req: Request, res: Response) => {
    const eventId = req.params.eventId;

    return Event.findByIdAndDelete(eventId)
        .then((event) => (event ? res.status(201).json({ event, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createEvent, readEvent, readEventByType, readEventParticipants, readAll, updateEvent, deleteEvent };