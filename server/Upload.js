const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  
  username: { type: String, required: true },
  password: { type: String, required: true },
  
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },


  
});

const UserModel = model("Sky", UserSchema);

module.exports = UserModel;