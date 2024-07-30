import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const devices = await prisma.device.findMany();
  return NextResponse.json(devices);
}

export async function POST(request: Request) {
  const data = await request.json();

  const newDevice = await prisma.device.create({
    data,
  });

  return NextResponse.json(newDevice, { status: 201 });
}
