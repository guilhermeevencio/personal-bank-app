import 'reflect-metadata';
import express from 'express';
import './shared/container';
import { router } from './routes'

const app = express();

app.use(express.json())

app.get('/', (req, res) => res.status(200).json({ message: 'hello world 222!' }));

app.use(router)


app.listen(3001);
