import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const users = new mongoose.Schema({
  username: { type: String },
  email: {
    type: String,
  },
  password: { type: String },
});

users.plugin(passportLocalMongoose);

const userAccount = mongoose.model("userAccount", users);

export default userAccount;
