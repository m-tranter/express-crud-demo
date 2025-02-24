
import { } from 'dotenv/config';
import mongoose from "mongoose";

let mongoPwd = process.env.MONGO_PWD;

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
  items: []
});

const CrudUsers = mongoose.model("CrudUser", UserSchema);
const Items = mongoose.model("Item", ItemSchema);
const mongoString = `mongodb+srv://marktranter:${mongoPwd}@cluster0.7moof0m.mongodb.net/`;
mongoose.connect(mongoString);
const db = mongoose.connection;
db.on("error", (error) => {
  console.log(error);
});

const getUser = async (token, tokens) => {
  let auth = tokens.find(e => e.token === token);
  let user = await CrudUsers.findById(auth.id);
  return user;
}

export { db, CrudUsers, Items, getUser }

