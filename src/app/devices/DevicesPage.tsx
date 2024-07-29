import React, { useState, useEffect } from "react";
import Filters from "../../components/Filters";
import DeviceCard from "./DeviceCard";
import prisma from "../../lib/prisma";
import { Device } from "../../models/Device";

const DevicesPage: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    async function fetchDevices() {
      const response = await prisma.device.findMany();
      setDevices(response);
    }
    fetchDevices();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filterValue = e.target.value;
    // Lógica para filtrar dispositivos
  };

  return (
    <div>
      <Filters onFilterChange={handleFilterChange} />
      <div>
        {devices.map((device) => (
          <DeviceCard key={device.id} device={device} />
        ))}
      </div>
    </div>
  );
};

export default DevicesPage;
