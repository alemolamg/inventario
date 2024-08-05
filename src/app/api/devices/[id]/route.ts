import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Manejar las peticiones GET para obtener un dispositivo específico
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

// Manejar las peticiones PUT para actualizar un dispositivo
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { name, brand, ipAddress, macAddress, status, userId } =
    await request.json();

  try {
    const updatedDevice = await prisma.device.update({
      where: { id: parseInt(id, 10) },
      data: { name, brand, ipAddress, macAddress, status, userId },
    });

    return NextResponse.json(updatedDevice);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating device" },
      { status: 500 }
    );
  }
}

// Manejar las peticiones DELETE para eliminar un dispositivo
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await prisma.device.delete({
      where: { id: parseInt(id, 10) },
    });

    return NextResponse.json({ message: "Device deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting device" },
      { status: 500 }
    );
  }
}
