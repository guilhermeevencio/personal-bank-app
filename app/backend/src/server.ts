import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import './shared/container';
import 'express-async-errors'
import { router } from './routes'
import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(express.json())
app.use(cors({ origin: true }));

app.get('/', (req, res) => res.status(200).json({ message: 'hello world 222!' }));

app.use(router)
app.use(errorHandler)


app.listen(3001);
