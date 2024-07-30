"use client";

import React, { useState, useEffect } from "react";
import { Device, DeviceStatus } from "@/models/Device";
import Modal from "@/components/Modal";
import AddDeviceForm from "@/components/AddDeviceForm";
import { ComputerDesktopIcon, PlusIcon } from "@heroicons/react/16/solid";

interface DeviceTableProps {
  devices: Device[];
  onUpdateDevice: (updatedDevice: Device) => void;
}

const DeviceTable: React.FC<DeviceTableProps> = ({
  devices,
  onUpdateDevice,
}) => {
  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filteredDevices, setFilteredDevices] = useState<Device[]>(devices);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let filtered = devices;

    if (filterName) {
      filtered = filtered.filter((device) =>
        device.name.toLowerCase().includes(filterName.toLowerCase())
      );
    }

    if (filterStatus) {
      filtered = filtered.filter(
        (device) => device.status?.toLowerCase() === filterStatus.toLowerCase()
      );
    }

    setFilteredDevices(filtered);
  }, [filterName, filterStatus, devices]);

  const handleStatusChange = (deviceId: number, newStatus: DeviceStatus) => {
    const updatedDevice = devices.find((device) => device.id === deviceId);
    if (updatedDevice) {
      onUpdateDevice({ ...updatedDevice, status: newStatus });
    }
  };

  const handleAddDevice = async (newDevice: Omit<Device, "id">) => {
    await fetch("/api/devices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDevice),
    });

    // Refresh the devices list
    const response = await fetch("/api/devices");
    const updatedDevices = await response.json();
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <input
            type="text"
            placeholder="Filtrar por nombre..."
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            className="border p-2 rounded"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border p-2 rounded ml-2"
          >
            <option value="">Todos los estados</option>
            {Object.values(DeviceStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <button
          className="flex justify-center bg-green-800 text-white px-4 py-2 rounded mt-4"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusIcon className="h-5 w-5"/>
          <ComputerDesktopIcon className="h-5 w-5 mr-1" />
          Añadir Dispositivo
        </button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <AddDeviceForm
            onSubmit={handleAddDevice}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      </div>

      <h1 className="text-2xl font-bold mb-4">Inventario de Dispositivos</h1>
      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border-b border-gray-200 md:table-row">
            <th className="p-2 text-left block md:table-cell">ID</th>
            <th className="p-2 text-left block md:table-cell">Nombre</th>
            <th className="p-2 text-left block md:table-cell">Marca</th>
            <th className="p-2 text-left block md:table-cell">IP</th>
            <th className="p-2 text-left block md:table-cell">MAC</th>
            <th className="p-2 text-left block md:table-cell">Estado</th>
            <th className="p-2 text-left block md:table-cell">Usuario</th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {filteredDevices.map((device) => (
            <tr
              key={device.id}
              className="border-b border-gray-200 md:table-row"
            >
              <td className="p-2 block md:table-cell">{device.id}</td>
              <td className="p-2 block md:table-cell">{device.name}</td>
              <td className="p-2 block md:table-cell">{device.brand}</td>
              <td className="p-2 block md:table-cell">
                {device.ipAddress || "N/A"}
              </td>
              <td className="p-2 block md:table-cell">
                {device.macAddress || "N/A"}
              </td>
              <td className="p-2 block md:table-cell">
                <select
                  value={device.status || ""}
                  onChange={(e) =>
                    handleStatusChange(
                      device.id,
                      e.target.value as DeviceStatus
                    )
                  }
                  className="border p-1 rounded"
                >
                  <option value="">Seleccionar estado</option>
                  {Object.values(DeviceStatus).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
              <td className="p-2 block md:table-cell">
                {device.userId ?? "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceTable;
