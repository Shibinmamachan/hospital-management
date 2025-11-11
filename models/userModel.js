const mongoose = require('mongoose');

const appointmentmentSchema =new mongoose.Schema({
    doctor_id:{type:mongoose.Schema.Types.ObjectId,ref:'Doctor',required:true},
    date: { type: Date, default: Date.now },
    time: { type: String, required: true }

});

const userSchema = new mongoose.Schema({
 name:{type:String,required:true},
 address:{type:String,required:true},
 age:{type:String,required:true},
 gender:{type:String,enum:['male','female','other','prefer not to say'],required:true},
 contact_number:{type:String,required:true},
 email:{type:String,required:true,unique:true},
 password:{type:String,required:true},
 appointment:[appointmentmentSchema]

});
const User = mongoose.model('User', userSchema);
module.exports = User;