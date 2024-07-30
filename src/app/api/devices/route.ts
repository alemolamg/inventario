import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const devices = await prisma.device.findMany();
    return NextResponse.json(devices);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching devices" },
      { status: 500 }
    );
  }
}
