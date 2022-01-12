import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const users = new mongoose.Schema({
  username: { type: String, unique: true },
  email: {
    type: String,
    unique: true,
  },
  password: { type: String },
  hp: { type: Number, unique: true },
  telegramHandle: { type: String, unique: true },
});

users.plugin(passportLocalMongoose, {});

const userAccount = mongoose.model("userAccount", users);

export default userAccount;
