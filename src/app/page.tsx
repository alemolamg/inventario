import prisma from "../lib/prisma";
import { Device } from "../models/Device";
import DeviceTable from "../components/DeviceTable";

export default async function InventoryPage() {
  // Obtén los datos en el servidor
  const devices: Device[] = await prisma.device.findMany();

  // Renderiza el componente del cliente con los datos obtenidos
  return (
    <div>
      <DeviceTable devices={devices} />
    </div>
  );
}
