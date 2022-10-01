import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config.js';
import express from 'express';
import userRoutes from './components/users/users.routes.js';
import { urlConfig } from './configs/index.js';

const app = express();

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

app.get('/', (req, res) => {
    res.send('DOCAPP API');
});

app.use('/api/v1/users', userRoutes);

export default app;
