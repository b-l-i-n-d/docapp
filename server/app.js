import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config.js';
import express from 'express';
import mongoose from 'mongoose';

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

const CONNECTION_URL = process.env.DB_URL;
const PORT = process.env.PORT || 5000;

mongoose
    .connect(CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>
        app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`))
    )
    .catch((error) => console.log(`${error} did not connect`));
