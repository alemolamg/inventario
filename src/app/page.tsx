import prisma from "../lib/prisma";
import { Device } from "../models/Device";
import Link from "next/link";
import Image from "next/image";
import { ComputerDesktopIcon, UsersIcon } from "@heroicons/react/20/solid";

const InventoryPage = async () => {
  // Obtén los datos de los dispositivos del servidor
  const devices: Device[] = await prisma.device.findMany();

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center mb-8">
          <Image src="/vercel.svg" alt="Logo" width={150} height={150} />
        </div>
        <div className="flex space-x-4">
          <Link href="/devices">
            <div className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg text-lg hover:bg-blue-600 transition">
              <ComputerDesktopIcon className="w-20" />
              <p>Ver Dispositivos</p>
            </div>
          </Link>
          <Link href="/users">
            <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg text-lg hover:bg-green-600 transition">
            <UsersIcon className=" w-20" />
              Ver Usuarios
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
