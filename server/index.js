import 'dotenv/config.js';
import mongoose from 'mongoose';
import app from './app.js';
import { dbConfig } from './configs/index.js';

const PORT = process.env.PORT || 5000;

mongoose
    .connect(dbConfig.URL, dbConfig.OPTIONS)
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`)))
    .catch((error) => console.log(`${error}. Server did not connect`));
