const mongoose = require("mongoose");
  var Validator = require('validator');
const GameModel = new mongoose.Schema({
  username: {
    type: String,
   // required: [true,"username Required"],
    min: 3,
    max: 20,
    unique: true,
  },
  gmail: {
    type: String,
  //  required: true,
    unique: true,
    max: 50
  },
  password: {
    type: String,
 //   required: true,
    min: 8,
  },
  fullname:{
    type:String,
   // required:true,
  }
});
GameModel.pre('save', function (next) {
  if (this.gmail.length==0 || this.username.length==0 ||this.fullname.length==0||this.password.length==0 ) {
    const error = new Error('Please fill all field');
    return next("Please fill all field");
  }
  next();
});
GameModel.pre('save', function (next) {
  const UserModel = mongoose.model('Register', GameModel);
  UserModel.find({ username: this.username }).then((data) => {
    if (data.length > 0) {
      const error = new Error('Username is not available. Please select another one.');
      return next("Username not available");
    } else {
      next();
    }
  }).catch((err) => {
    next('please fill username');
  });
});
GameModel.pre('save', function (next) {
    if (!Validator.isStrongPassword(this.password)) {
      const error = new Error('Password must be at least 8 characters long.');
      return next("password must have min one lowercase,one uppercase,one special,8 characters long");
    }
    next();
  });
 
  GameModel.pre('save',function(next){
    if(!Validator.isEmail(this.gmail))
    {
      const error = new Error('gmail is not available. Please select another one.');
        return next("Please enter correct email");
      } else {
        next();
      }

    


  })





module.exports = mongoose.model("Register", GameModel);
