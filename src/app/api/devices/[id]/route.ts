// src/app/api/devices/[id]/route.ts

import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { status } = await request.json();

  if (!status) {
    return NextResponse.json({ error: "Status is required" }, { status: 400 });
  }

  const updatedDevice = await prisma.device.update({
    where: { id: parseInt(id, 10) },
    data: { status },
  });

  return NextResponse.json(updatedDevice);
}

export async function GET() {
  const devices = await prisma.device.findMany();
  return NextResponse.json(devices);
}
