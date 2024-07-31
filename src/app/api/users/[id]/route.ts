import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { name, email, workZone, contact } = await request.json();

  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required" },
      { status: 400 }
    );
  }

  const updatedUser = await prisma.user.update({
    where: { id: parseInt(id, 10) },
    data: { name, email, workZone, contact },
  });

  return NextResponse.json(updatedUser);
}
