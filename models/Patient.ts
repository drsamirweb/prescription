import mongoose, { Schema, models, model } from 'mongoose';

const PatientSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  mobile: { type: String },
  age: { type: Number },
});

const Patient = models.Patient || model('Patient', PatientSchema);
export default Patient;
