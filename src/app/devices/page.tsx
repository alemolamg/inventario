"use client";

import React, { useState, useEffect } from "react";
import { Device } from "@/models/Device";
import DeviceTable from "@/app/devices/DeviceTable";
import { User } from "@/models/User";

const InventoryPage: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchDevices = async () => {
      const response = await fetch("/api/devices");
      const devices = await response.json();
      setDevices(devices);
    };

    const fetchUsers = async () => {
      const users = await (await fetch("/api/users")).json();
      setUsers(users);
    };

    fetchDevices();
    fetchUsers();
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
      <DeviceTable
        devices={devices}
        onUpdateDevice={handleUpdateDevice}
        users={users}
      />
    </div>
  );
};

export default InventoryPage;
