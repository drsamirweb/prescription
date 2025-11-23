import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

let cached = (global as any)._mongooseCached || { conn: null, promise: null };
(global as any)._mongooseCached = cached;

export default async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!MONGODB_URI) throw new Error('MONGODB_URI env not set');
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
