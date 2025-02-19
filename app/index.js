'use strict';
import {} from 'dotenv/config';
import express from 'express';

const app = express();
const port = process.env.PORT || 3001;

const myLogger = (req, _, next) => {
  console.log(`Incoming: ${req.url}`);
  next();
};

app.use(myLogger);
app.use(express.static('public'));

app.listen(port, (err) => {
  if (!err) {
    console.log(`Server running on port ${port}`);
  } else {
    console.log(err);
  }
});

app.post('/read', (req, res) => {
  console.log(req.body);
});
