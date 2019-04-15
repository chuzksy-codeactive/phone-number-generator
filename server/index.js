import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';

import phoneBook from './routes/phoneBook';

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 3000;

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/api/v1', phoneBook);
app.use(express.static(path.join(__dirname, '../../client/public/')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '/client/public/index.html'));
});

app.use('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '/client/public/index.html'));
});

app.set('port', PORT);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`App listening to port ${PORT}`);
  });
}

export default app;
