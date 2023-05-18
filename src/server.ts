import express from "express";
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from "./library/Logging";
import userRoutes from './routes/User';
import ticketRoutes from './routes/Ticket';
import eventRoutes from './routes/Event';

const router = express();

// MongoDB connection
mongoose.connect(config.mongo.url, {
    retryWrites: true,
    w: 'majority'
}).then(() => {
    Logging.info('Connection with mongoDB established');
    StartServer();
}).catch((error) => {
    Logging.error('Unable establish connection with mongoDB due to error: ' + error);
})

// Start server
const StartServer = () => {
    router.use((req, res, next) => {
        Logging.info(` Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            Logging.info(` Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP [${req.socket.remoteAddress}] - Status [${res.statusCode}]`);
        })

        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    // Rules of our API
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if(req.method == 'OPTIONS'){
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({})
        }

        next();
    });

    // Routes
    router.use('/users', userRoutes);
    router.use('/tickets', ticketRoutes);
    router.use('/events', eventRoutes);

    // Healthcheck
    router.get('/ping', (req, res, next) => res.status(200).json({message: 'pong'}));

    // Error handling
    router.use((req, res, next) => {
        const error = new Error('not found');
        Logging.error(error);

        return res.status(404).json({message: error.message});
    });

    http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}.`));
};
