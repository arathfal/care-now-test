import express from 'express';
import treatmentRouter from './routes/treatment';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api/treatment', treatmentRouter);

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
