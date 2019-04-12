import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import bodyParser from 'body-parser';

import phoneBook from './routes/phoneBook';

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./client/dist/'));

app.use('/api/v1', phoneBook);

app.listen(process.env.PORT, () => {
  console.log(`App listening to port ${process.env.PORT}`);
})

export default app;