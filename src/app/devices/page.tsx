import prisma from "@/lib/prisma";
import { Device } from "@/models/Device";
import DeviceTable from "@/components/DeviceTable";
import Navbar from "@/components/Navbar";

const InventoryPage = async () => {
  // Obtén los datos de los dispositivos del servidor
  const devices: Device[] = await prisma.device.findMany();

  return (
    <div>
      <DeviceTable devices={devices} />
    </div>
  );
};

export default InventoryPage;
