import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from "./routes/auth.mjs";

const app = express();
const Port = process.env.PORT || 5000;

dotenv.config();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded());

app.get('/', (req,res) => {
    res.send('Hello, World');
});

app.use('/auth', authRoutes);

app.listen(Port, () => console.log(`Running http://localhost:${Port}`));
