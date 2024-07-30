"use client"; // Añade esto al principio del archivo

import React, { useState, useEffect } from "react";
import { Device, DeviceStatus } from "@/models/Device";
import DeviceTable from "@/app/devices/DeviceTable";

const InventoryPage: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    const fetchDevices = async () => {
      const response = await fetch("/api/devices");
      const devices = await response.json();
      setDevices(devices);
    };

    fetchDevices();
  }, []);

  const handleUpdateDevice = async (updatedDevice: Device) => {
    await fetch(`/api/devices/${updatedDevice.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: updatedDevice.status }),
    });

    // Refresh the devices list
    const response = await fetch("/api/devices");
    const updatedDevices = await response.json();
    setDevices(updatedDevices);
  };

  return (
    <div>
      <DeviceTable devices={devices} onUpdateDevice={handleUpdateDevice} />
    </div>
  );
};

export default InventoryPage;
