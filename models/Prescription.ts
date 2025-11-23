import mongoose, { Schema, models, model } from 'mongoose';

const PrescriptionSchema = new Schema({
  id: { type: String, required: true, unique: true },
  patientId: { type: String, required: true },
  chamberId: { type: String, required: true },
  serial: { type: String, required: true },
  date: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
  data: {
    chiefComplaints: [String],
    history: [String],
    examinations: [String],
    diagnosis: [String],
    rx: [String],
    advice: [String],
    followUp: [String],
    referredTo: [String],
  },
});

const Prescription = models.Prescription || model('Prescription', PrescriptionSchema);
export default Prescription;
