import express from 'express';
const app = express();
import router from './routes';

app.get('/', (req, res) => res.status(200).json({ message: 'hello world 2!' }));

app.use(router)

app.listen(3001);