"use client";

import React, { useState, useEffect } from "react";
import { Device } from "../models/Device";

interface DeviceTableProps {
  devices: Device[];
}

const DeviceTable: React.FC<DeviceTableProps> = ({ devices }) => {
  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filteredDevices, setFilteredDevices] = useState<Device[]>(devices);

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

  return (
    <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Inventario de Dispositivos</h1>
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
            <option value="Nuevo">Nuevo</option>
            <option value="Usado">Usado</option>
            <option value="Dañado">Dañado</option>
          </select>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Añadir Dispositivo
        </button>
      </div>

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
                {device.status || "N/A"}
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
