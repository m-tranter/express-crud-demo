'use strict';
import express from 'express';
import path from 'path';
import { db, Items, CrudUsers, getUser } from './mongo.js';
import { fileURLToPath } from 'url';
import { myLogger } from './helpers.js'
import { v4 } from 'uuid';

db.once("connected", () => {
  console.log("Mongo connected.")
  // Use code like this to create a new user.
  // let user = new CrudUsers({ user: "guest", pwd: "guest" });
  // user.save();
});

const port = process.env.PORT || 3001;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, '../public');
const tokens = [];

const app = express();
app.use(myLogger(tokens));
app.use(express.json());
app.use(express.static(dir));

app.listen(port, (error) => {
  if (!error) {
    console.log(`Server running on port ${port}`);
  } else {
    console.log(error);
  }
});

app.post('/login', async (req, res) => {
  let user = await CrudUsers.findOne({ user: req.body.user, pwd: req.body.pwd }).exec();
  if (user) {
    const items = user.items;
    const msg = "Credentials validated."
    const existingToken = tokens.find(e => e.id === user.id);
    const token = existingToken ? existingToken.token : v4();
    if (!existingToken) {
      tokens.push({ token, id: user.id, name: req.body.user })
    }
    res.json({ token, msg, items })
  } else {
    res.json({ msg: "Invalid credentials." })
  }
});

app.post('/create', async (req, res) => {
  let user = await getUser(req.body.token, tokens);
  if (user) {
    user.items.push(new Items({ text: req.body.text, priority: req.body.priority, editing: false, v: req.body.v }))
    user.items.sort((a, b) => a.priority - b.priority);
    user.save();
    res.json({ msg: "Item created.", items: user.items })
  }
  else {
    res.json({ msg: "Invalid credentials." })
  }
});

app.post('/read', async (req, res) => {
  let user = await getUser(req.body.token, tokens);
  if (user) {
    res.json({ msg: "Data read.", items: user.items });
  }
  else {
    res.json({ msg: "Invalid credentials." })
  }
});

app.post('/update', async (req, res) => {
  let user = await getUser(req.body.token, tokens);
  if (user) {
    let update = req.body;
    let item = user.items.find(e => e._id.toString() === update._id);
    if (!item) {
      res.json({ msg: "Can't find that item now.", items: user.items })
    } else if (item.v === update.v) {
      item.v += 1;
      item.text = update.text;
      item.priority = update.priority
      user.items.sort((a, b) => a.priority - b.priority);
      user.save();
      res.json({ msg: "Item updated", items: user.items })
    }
    else {
      res.json({ msg: "Not the latest version.", items: user.items })
    }
  }
  else {
    res.json({ msg: "Invalid credentials." })
  }
});

app.post('/delete', async (req, res) => {
  let user = await getUser(req.body.token, tokens);
  if (user) {
    user.items = user.items.filter(e => JSON.stringify(e._id) !== JSON.stringify(req.body.id));
    user.save();
    res.json({ msg: "Item deleted.", items: user.items });
  }
  else {
    res.json({ msg: "Invalid credentials." })
  }
});
