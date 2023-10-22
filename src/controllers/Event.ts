import { Request, Response } from "express";
import mongoose from "mongoose";
import Event from "../models/Event";
import Ticket from "../models/Ticket";
import User from "../models/User";

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

  const date = new Date();
  const eventId = event._id;

  new Ticket({
    _id: new mongoose.Types.ObjectId(),
    name,
    type,
    price,
    date,
    eventId,
  }).save();

  return event
    .save()
    .then((event) => res.status(201).json({ event }))
    .catch((error) => res.status(500).json({ error }));
};

const readEvent = (req: Request, res: Response) => {
  const eventId = req.params.eventId;

  return Event.findById(eventId)
    .then((event) =>
      event
        ? res.status(200).json({ event })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const readEventByType = (req: Request, res: Response) => {
  const eventType = req.params.eventType;

  return Event.find()
    .then((events) => {
      let filteredEvents = events.filter((e) => e.type === eventType);
      filteredEvents
        ? res.status(200).json({ filteredEvents })
        : res.status(404).json({ message: "not found" });
    })
    .catch((error) => res.status(500).json({ error }));
};

const readEventParticipants = (req: Request, res: Response) => {
  const eventId = req.params.eventId;

  return Event.findById(eventId)
    .then((event) => {
      User.find()
        .then((users) => {
          const participants = users.filter((u: any) =>
            event?.participants.includes(u)
          );
          participants
            ? res.status(200).json({ participants })
            : res.status(404).json({ message: "not found" });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response) => {
  return Event.find()
    .then((events) => {
      if (req.query.filter && req.query.value) {
        switch (req.query.filter.toString().toLowerCase()) {
          case "_id": {
            events = events.filter((event) => event._id == req.query.value);
            break;
          }
          case "name": {
            events = events.filter((event) => event.name == req.query.value);
            break;
          }
          case "type": {
            events = events.filter((event) => event.type == req.query.value);
            break;
          }
          case "owner": {
            events = events.filter((event) => event.owner == req.query.value);
            break;
          }
          case "street": {
            events = events.filter((event) => event.street == req.query.value);
            break;
          }
          case "city": {
            events = events.filter((event) => event.city == req.query.value);
            break;
          }
          case "startdate": {
            events = filterStartDate(req.query, events);
            break;
          }
          case "enddate": {
            events = filterEndDate(req.query, events);
            break;
          }
          case "price": {
            events = events.filter(
              (event) => event.price.toString() == req.query.value
            );
            break;
          }
          case "promoted": {
            events = events.filter(
              (event) => event.isPromoted.toString() == req.query.value
            );
            break;
          }
          default: {
            events.length = 0;
            break;
          }
        }
      }

      res.status(200).json({ events });
    })
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
        return res.status(404).json({ message: "not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteEvent = (req: Request, res: Response) => {
  const eventId = req.params.eventId;

  Ticket.findOneAndDelete({ eventId: eventId });

  return Event.findByIdAndDelete(eventId)
    .then((event) =>
      event
        ? res.status(201).json({ event, message: "Deleted" })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createEvent,
  readEvent,
  readEventByType,
  readEventParticipants,
  readAll,
  updateEvent,
  deleteEvent,
};

//additionals functions
function filterStartDate(query: any, events: any): any {
  switch (query.value.toString().toLowerCase()) {
    case "year": {
      if (query.year) {
        const year = Number.parseInt(query.year.toString());
        return events.filter(
          (event: any) => event.startDate.getFullYear() == year
        );
      } else {
        events.length = 0;
        return events;
      }
    }
    case "month": {
      if (query.month) {
        const month = Number.parseInt(query.month.toString()) - 1;
        return events.filter(
          (event: any) => event.startDate.getMonth() == month
        );
      } else {
        events.length = 0;
        return events;
      }
    }
    case "day": {
      if (query.day) {
        const day = Number.parseInt(query.day!.toString());
        return events.filter(
          (event: any) => event.startDate.getUTCDate() == day
        );
      } else {
        events.length = 0;
        return events;
      }
    }
    case "date": {
      if (query.year) {
        if (query.month) {
          if (query.day) {
            const year = Number.parseInt(query.year.toString());
            const month = Number.parseInt(query.month.toString()) - 1;
            const day = Number.parseInt(query.day.toString());

            return events.filter(
              (event: any) =>
                event.startDate.getFullYear() == year &&
                event.startDate.getMonth() == month &&
                event.startDate.getUTCDate() == day
            );
          } else {
            const year = Number.parseInt(query.year.toString());
            const month = Number.parseInt(query.month.toString()) - 1;

            return events.filter(
              (event: any) =>
                event.startDate.getFullYear() == year &&
                event.startDate.getMonth() == month
            );
          }
        } else {
          const year = Number.parseInt(query.year.toString());
          return events.filter(
            (event: any) => event.startDate.getFullYear() == year
          );
        }
      } else {
        events.length = 0;
        return events;
      }
    }
  }
}

function filterEndDate(query: any, events: any): any {
  switch (query.value.toString().toLowerCase()) {
    case "year": {
      if (query.year) {
        const year = Number.parseInt(query.year.toString());
        return events.filter(
          (event: any) => event.endDate.getFullYear() == year
        );
      } else {
        events.length = 0;
        return events;
      }
    }
    case "month": {
      if (query.month) {
        const month = Number.parseInt(query.month.toString()) - 1;
        return events.filter((event: any) => event.endDate.getMonth() == month);
      } else {
        events.length = 0;
        return events;
      }
    }
    case "day": {
      if (query.day) {
        const day = Number.parseInt(query.day!.toString());
        return events.filter((event: any) => event.endDate.getUTCDate() == day);
      } else {
        events.length = 0;
        return events;
      }
    }
    case "date": {
      if (query.year) {
        if (query.month) {
          if (query.day) {
            const year = Number.parseInt(query.year.toString());
            const month = Number.parseInt(query.month.toString()) - 1;
            const day = Number.parseInt(query.day.toString());

            return events.filter(
              (event: any) =>
                event.endDate.getFullYear() == year &&
                event.endDate.getMonth() == month &&
                event.endDate.getUTCDate() == day
            );
          } else {
            const year = Number.parseInt(query.year.toString());
            const month = Number.parseInt(query.month.toString()) - 1;

            return events.filter(
              (event: any) =>
                event.endDate.getFullYear() == year &&
                event.endDate.getMonth() == month
            );
          }
        } else {
          const year = Number.parseInt(query.year.toString());
          return events.filter(
            (event: any) => event.endDate.getFullYear() == year
          );
        }
      } else {
        events.length = 0;
        return events;
      }
    }
  }
}
