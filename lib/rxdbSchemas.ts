// lib/rxdbSchemas.ts

export const patientSchema = {
  title: "patient",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    mobile: { type: "string" },
    age: { type: "number" }
  },
  required: ["id", "name"]
};

export const prescriptionSchema = {
  title: "prescription",
  version: 1,
  primaryKey: "id",
  type: "object",
  properties: {
    id: { type: "string" },
    patientId: { type: "string" },
    chamberId: { type: "string" },
    serial: { type: "string" },
    date: { type: "string" },
    updatedAt: { type: "string" },
    data: {
      type: "object",
      properties: {
        chiefComplaints: { type: "array", items: { type: "string" } },
        history: { type: "array", items: { type: "string" } },
        examinations: { type: "array", items: { type: "string" } }, // fixed image names
        diagnosis: { type: "array", items: { type: "string" } },
        rx: { type: "array", items: { type: "string" } },
        advice: { type: "array", items: { type: "string" } },
        followUp: { type: "array", items: { type: "string" } },
        referredTo: { type: "array", items: { type: "string" } }
      },
      required: ["chiefComplaints", "diagnosis", "rx"]
    }
  },
  required: ["id", "patientId", "chamberId", "serial", "date", "data"]
};

export const suggestionSchema = {
  title: "suggestion",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: { type: "string" },
    type: { type: "string" },   // 'chiefComplaint', 'diagnosis', 'rx', 'advice'
    text: { type: "string" },
    usageCount: { type: "number", default: 0 }
  },
  required: ["id", "type", "text"]
};
