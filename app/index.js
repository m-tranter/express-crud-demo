'use strict';

//import { } from 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { myLogger, makeItem } from './helpers.js'
const port = process.env.PORT || 3002;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const dir = path.join(__dirname, '../public');
let items = [makeItem({ text: "Use MongoDb for data persistence", priority: "1" })];

const app = express();
app.use(express.json());
app.use(express.static(dir));
app.use(myLogger);

app.listen(port, (error) => {
  if (!error) {
    console.log(`Server running on port ${port}`);
  } else {
    console.log(error);
  }
});

app.post('/create', (req, res) => {
  items.push(makeItem(req.body))
  items.sort((a, b) => a.priority - b.priority);
  res.json(items)
});

app.get('/read', (_, res) => {
  items.sort((a, b) => a.priority - b.priority);
  res.json(items)
});

app.post('/update', (req, res) => {
  let update = req.body;
  let item = items.find(e => e.id === update.id);
  if (item.v === update.v) {
    item.v += 1;
    item.text = update.text;
    item.priority = update.priority
    items.sort((a, b) => a.priority - b.priority);
    res.json(items)
  }
  else {
    res.json({ error: "Not the latest version." })
  }
});

app.post('/delete', (req, res) => {
  items = items.filter(e => e.id !== req.body.id)
  res.json(items)
});
