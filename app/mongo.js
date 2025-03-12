'use strict';
// Comment next line out when pushing to render
import { } from 'dotenv/config';
import mongoose from "mongoose";

const mongoString = process.env.MONGO_STRING;

const ItemSchema = new mongoose.Schema({
  editing: Boolean,
  text: String,
  priority: Number,
  v: Number
});

const UserSchema = new mongoose.Schema({
  pwd: {
    required: true,
    type: String,
  },
  user: {
    required: true,
    type: String,
  },
  items: [ItemSchema]
});

const CrudUsers = mongoose.model("CrudUser", UserSchema);
const Items = mongoose.model("Item", ItemSchema);

mongoose.connect(mongoString);
const db = mongoose.connection;
db.on("error", (error) => {
  console.log(error);
});

const getUser = async (token, tokens) => {
  let auth = tokens.find(e => e.token === token);
  if (auth) {
    let user = await CrudUsers.findById(auth.id);
    return user;
  }
}

export { db, CrudUsers, Items, getUser }

