const express = require('express');
const mongoose = require('mongoose');
// require('dotenv').config();
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.use(cors({
  credentials: true,
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
  ],
}));

// краш-тест сервера
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Слушаю порт ${PORT}`);
});
