import { NextResponse } from "next/server";
import {conn} from '@/libs/db'

export async function GET() {
  const result = await conn.query("SELECT NOW() AS currentTime");
  return NextResponse.json({ message: result[0]["currentTime"] });
}




