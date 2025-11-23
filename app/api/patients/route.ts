import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Patient from "@/models/Patient";

export async function POST(req: Request) {
  await dbConnect();
  const payload = await req.json();
  await Patient.updateOne({ id: payload.id }, { $set: payload }, { upsert: true });
  return NextResponse.json({ success: true });
}
