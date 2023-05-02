/* eslint-disable no-nested-ternary */
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config.js';
import express from 'express';
import morgan from 'morgan';
import appointmentRoutes from './components/appointments/appointments.routes.js';
import departmentRoutes from './components/departments/departments.routes.js';
import districtsRoutes from './components/districts/districts.routes.js';
import doctorRoutes from './components/doctors/doctors.routes.js';
import userRoutes from './components/users/users.routes.js';
import workplacesRoutes from './components/workplaces/workplaces.routes.js';
import { urlConfig } from './configs/index.js';

const app = express();

morgan.token('date', () => new Date().toLocaleString());
morgan.token('method', (req) => {
    const method = req.method.toUpperCase();
    switch (method) {
        case 'POST':
            // return blue
            return `\x1b[36m[${method}]\x1b[0m`;
        case 'PATCH':
            // return yellow
            return `\x1b[33m[${method}]\x1b[0m`;
        case 'PUT':
            // return indigo
            return `\x1b[34m[${method}]\x1b[0m`;
        case 'DELETE':
            // return red
            return `\x1b[31m[${method}]\x1b[0m`;
        default:
            // return purple
            return `\x1b[35m[${method}]\x1b[0m`;
    }
});
morgan.token('statusColor', (req, res) => {
    // get the status code if response written
    const status = (typeof res.headersSent !== 'boolean' ? Boolean(res.header) : res.headersSent)
        ? res.statusCode
        : undefined;

    // get status color
    const color =
        status >= 500
            ? 31 // red
            : status >= 400
            ? 33 // yellow
            : status >= 300
            ? 34 // cyan
            : status >= 200
            ? 32 // green
            : 0; // no color

    return `\x1b[${color}m${status}\x1b[0m`;
});

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(
    bodyParser.urlencoded({
        limit: '50mb',
        extended: true,
        parameterLimit: 50000,
    })
);
app.use(
    cors({
        origin: [urlConfig.FRONT_URL],
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());
app.use(
    morgan(
        `:date :method \x1b[36m:url\x1b[0m :statusColor :response-time ms - length|:res[content-length]`
    )
);

app.get('/', (req, res) => {
    res.send('DOCAPP API');
});
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/doctors', doctorRoutes);
app.use('/api/v1/appointments', appointmentRoutes);
app.use('/api/v1/departments', departmentRoutes);
app.use('/api/v1/districts', districtsRoutes);
app.use('/api/v1/workplaces', workplacesRoutes);

// show 404 if URL not found
app.use((req, res) => {
    res.status(404).send({ url: `${req.originalUrl} not found` });
});

export default app;
