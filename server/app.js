import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config.js';
import express from 'express';
import usersRoutes from './components/users/users.js';

const app = express();

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(
    bodyParser.urlencoded({
        limit: '50mb',
        extended: true,
        parameterLimit: 50000,
    })
);
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('DOCAPP API');
});

app.use('/api/v1/users', usersRoutes);

export default app;
