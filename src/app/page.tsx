import prisma from "../lib/prisma";
import { Device } from "../models/Device";
import DeviceTable from "../components/DeviceTable";

export default async function InventoryPage() {
  const devices: Device[] = await prisma.device.findMany();

  return (
    <div>
      <DeviceTable devices={devices} />
    </div>
  );
}
