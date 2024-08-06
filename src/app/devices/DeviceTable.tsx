import React, { useState, useEffect } from "react";
import { Device, DeviceStatus } from "@/models/Device";
import { User } from "@/models/User";
import Modal from "@/components/Modal";
import AddDeviceForm from "@/components/AddDeviceForm";
import EditDeviceForm from "@/components/EditDeviceForm";
import {
  ComputerDesktopIcon,
  PlusIcon,
  PencilIcon,
} from "@heroicons/react/20/solid";

interface DeviceTableProps {
  devices: Device[];
  users: User[];
  onUpdateDevice: (updatedDevice: Device) => void;
}

const DeviceTable: React.FC<DeviceTableProps> = ({ devices, users }) => {
  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filteredDevices, setFilteredDevices] = useState<Device[]>(devices);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deviceToEdit, setDeviceToEdit] = useState<Device | null>(null);

  useEffect(() => {
    let filtered = devices;

    if (filterName) {
      filtered = filtered.filter(
        (device) =>
          device.name.toLowerCase().includes(filterName.toLowerCase()) ||
          device.brand?.toLowerCase().includes(filterName.toLowerCase()) ||
          device.ipAddress?.includes(filterName.toLowerCase())
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
      handleUpdateDevice({ ...updatedDevice, status: newStatus });
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
    setFilteredDevices(updatedDevices);
  };

  const handleEditDevice = (device: Device) => {
    setDeviceToEdit(device);
    setIsEditModalOpen(true);
  };

  const handleUpdateDevice = async (updatedDevice: Device) => {
    await fetch(`/api/devices/${updatedDevice.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedDevice),
    });

    // Refresh the devices list
    const response = await fetch("/api/devices");
    const updatedDevices = await response.json();
    setFilteredDevices(updatedDevices);
    setIsEditModalOpen(false);
  };

  const handleDeleteDevice = async (deviceId: number) => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar este dispositivo?")
    ) {
      await fetch(`/api/devices/${deviceId}`, {
        method: "DELETE",
      });

      // Refresh the devices list after deletion
      const response = await fetch("/api/devices");
      const updatedDevices = await response.json();
      setFilteredDevices(updatedDevices);
      setIsEditModalOpen(false);
    }
  };

  const getUserName = (userId: number | undefined | null) => {
    const user = users.find((user) => user.id === userId);
    return user ? `${user.id} - ${user.name}` : "N/A";
  };

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
            {Object.values(DeviceStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <button
          className="flex items-center bg-green-800 text-white px-4 py-2 rounded mt-4"
          onClick={() => setIsAddModalOpen(true)}
        >
          <PlusIcon className="h-5 w-5" />
          <ComputerDesktopIcon className="h-6 w-6 mr-1" />
          Añadir Dispositivo
        </button>
        <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
          <AddDeviceForm
            onSubmit={handleAddDevice}
            onClose={() => setIsAddModalOpen(false)}
          />
        </Modal>
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
            <th className="p-2 text-left block md:table-cell">Acciones</th>
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
                {getUserName(device.userId)}
              </td>
              <td className="p-2 block md:table-cell">
                <button
                  className="flex items-center bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => handleEditDevice(device)}
                >
                  <PencilIcon className="h-5 w-5 mr-2" />
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        {deviceToEdit && (
          <EditDeviceForm
            device={deviceToEdit}
            users={users}
            onSubmit={handleUpdateDevice}
            onDelete={handleDeleteDevice}
            onClose={() => setIsEditModalOpen(false)}
          />
        )}
      </Modal>
    </div>
  );
};

export default DeviceTable;
