import express from 'express';
const app = express();

app.get('/', (req, res) => res.status(200).json({ message: 'hello world 2!' }));

app.listen(3001);
