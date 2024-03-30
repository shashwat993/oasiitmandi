import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: String,
    roll:String,
    cgpa:String,
    address:String,
    email:String,
    roomNumber:Number,
    dob:String,
    degree:String,
    phoneNumber:Number,
    hostelName:String,
    category:String,
    bloodGroup:String,
    photo:String,
    score:String,
    rank:Number
})

const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);

export default Student;