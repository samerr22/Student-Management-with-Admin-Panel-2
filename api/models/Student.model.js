import mongoose from 'mongoose';


const studentSchema = new mongoose.Schema({
  Id: {
        type: String,
        required: true
      },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String, 
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'], 
    default: 'active' 
  }
});


const Student = mongoose.model('Student', studentSchema);

export default  Student;
