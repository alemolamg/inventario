// src/components/DeviceTable.tsx
"use client"; // Asegúrate de que este archivo se trate como un componente del lado del cliente

import React, { useState, useEffect } from "react";
import { Device, DeviceStatus } from "../models/Device";

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

  const handleStatusChange = async (
    deviceId: number,
    newStatus: DeviceStatus
  ) => {
    try {
      // Envía la actualización al servidor
      const response = await fetch(`/api/devices/${deviceId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el dispositivo");
      }

      // Refresca la lista de dispositivos
      const updatedDevices = await fetch("/api/devices").then((res) =>
        res.json()
      );
      setFilteredDevices(updatedDevices);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Inventario de Dispositivos</h1>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <div className="flex flex-col sm:flex-row">
          <input
            type="text"
            placeholder="Filtrar por nombre..."
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            className="border p-2 rounded mb-2 sm:mb-0"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border p-2 rounded sm:ml-2"
          >
            <option value="">Todos los estados</option>
            {Object.values(DeviceStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2 sm:mt-0">
          Añadir Dispositivo
        </button>
      </div>

      <div className="hidden md:block">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Nombre</th>
              <th className="p-2 text-left">Marca</th>
              <th className="p-2 text-left">IP</th>
              <th className="p-2 text-left">MAC</th>
              <th className="p-2 text-left">Estado</th>
              <th className="p-2 text-left">Usuario</th>
            </tr>
          </thead>
          <tbody>
            {filteredDevices.map((device) => (
              <tr key={device.id} className="border-b border-gray-200">
                <td className="p-2">{device.id}</td>
                <td className="p-2">{device.name}</td>
                <td className="p-2">{device.brand}</td>
                <td className="p-2">{device.ipAddress || "N/A"}</td>
                <td className="p-2">{device.macAddress || "N/A"}</td>
                <td className="p-2">
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
                <td className="p-2">{device.userId ?? "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="block md:hidden">
        {filteredDevices.map((device) => (
          <div key={device.id} className="border-b border-gray-200 p-2 mb-2">
            <p>
              <strong>ID:</strong> {device.id}
            </p>
            <p>
              <strong>Nombre:</strong> {device.name}
            </p>
            <p>
              <strong>Marca:</strong> {device.brand}
            </p>
            <p>
              <strong>Estado:</strong> {device.status}
            </p>
            <p>
              <strong>Usuario:</strong> {device.userId ?? "N/A"}
            </p>
            {/* Campos adicionales */}
            <details className="mt-2">
              <summary className="cursor-pointer text-blue-500">
                Más detalles
              </summary>
              <p>
                <strong>IP:</strong> {device.ipAddress || "N/A"}
              </p>
              <p>
                <strong>MAC:</strong> {device.macAddress || "N/A"}
              </p>
              <div>
                <label className="block text-sm">
                  Cambiar estado:
                  <select
                    value={device.status || ""}
                    onChange={(e) =>
                      handleStatusChange(
                        device.id,
                        e.target.value as DeviceStatus
                      )
                    }
                    className="border p-1 rounded w-full mt-1"
                  >
                    <option value="">Seleccionar estado</option>
                    {Object.values(DeviceStatus).map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceTable;
