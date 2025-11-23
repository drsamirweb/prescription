import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Suggestion from "@/models/Suggestion";

export const runtime = 'nodejs';
export async function GET(req: Request) {
  await dbConnect();
  const url = new URL(req.url);
  const type = url.searchParams.get('type');
  const docs = await Suggestion.find(type ? { type } : {}).sort({ usageCount: -1 }).limit(50).lean();
  return NextResponse.json({ suggestions: docs.map((d) => d.text) });
}

export async function POST(req: Request) {
  await dbConnect();
  const payload = await req.json();
  const { type, text } = payload;
  if (!type || !text) return NextResponse.json({ ok: false }, { status: 400 });
  await Suggestion.updateOne({ type, text }, { $inc: { usageCount: 1 }, $setOnInsert: { id: crypto.randomUUID(), type, text } }, { upsert: true });
  return NextResponse.json({ ok: true });
}
