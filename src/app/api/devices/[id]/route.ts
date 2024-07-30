import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Manejar las peticiones GET para obtener dispositivos específicos si se necesita en el futuro
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const device = await prisma.device.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!device) {
      return NextResponse.json({ error: "Device not found" }, { status: 404 });
    }

    return NextResponse.json(device);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching device" },
      { status: 500 }
    );
  }
}

// Manejar las peticiones PUT para actualizar el estado de un dispositivo
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { status } = await request.json();

  if (!status) {
    return NextResponse.json({ error: "Status is required" }, { status: 400 });
  }

  try {
    const updatedDevice = await prisma.device.update({
      where: { id: parseInt(id, 10) },
      data: { status },
    });

    return NextResponse.json(updatedDevice);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating device" },
      { status: 500 }
    );
  }
}
