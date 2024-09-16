const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  voterId: { type: String, required: true, unique: true },
  email:{type:String,required:true,unique:true},
  name:{type:String, required:true},
  pinCode:{type:String,required:true},
  password: { type: String, required: true },
  isVerified:{type:Boolean, default:false},
  photo: { type: String },
  resetPasswordToken:String,
  resetPasswordExpiresAt:Date,
  verificationToken:String,
  verficationTokenExpiresAt:Date, 
},{timestamps:true});

module.exports = mongoose.model('User', UserSchema);
