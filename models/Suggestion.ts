import mongoose, { Schema, models, model } from 'mongoose';

const SuggestionSchema = new Schema({
  id: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  text: { type: String, required: true },
  usageCount: { type: Number, default: 0 },
});

SuggestionSchema.index({ type: 1, text: 1 }, { unique: true });

const Suggestion = models.Suggestion || model('Suggestion', SuggestionSchema);
export default Suggestion;
