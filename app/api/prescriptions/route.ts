import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Prescription from "@/models/Prescription";

export async function POST(req: Request) {
  await dbConnect();
  const payload = await req.json();
  try {
    await Prescription.create({
      ...payload,
      date: new Date(payload.date),
      updatedAt: new Date(payload.updatedAt),
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
