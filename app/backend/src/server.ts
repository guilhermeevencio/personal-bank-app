import 'reflect-metadata'
import express from 'express';
const app = express();
import './shared/container'

app.get('/', (req, res) => res.status(200).json({ message: 'hello world 222!' }));

app.listen(3001);
