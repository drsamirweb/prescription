import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Admin from "@/models/Admin";

export async function GET() {
  try {
    await dbConnect();
    const count = await Admin.countDocuments();
    return NextResponse.json({ connected: true, admins: count });
  } catch (e: any) {
    return NextResponse.json({ connected: false, error: e.message }, { status: 503 });
  }
}
