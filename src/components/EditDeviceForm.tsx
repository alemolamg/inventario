import React, { useState } from "react";
import { Device, DeviceStatus } from "@/models/Device";
import { User } from "@/models/User";

interface EditDeviceFormProps {
  device: Device;
  users: User[];
  onSubmit: (updatedDevice: Device) => void;
  onDelete: (deviceId: number) => void;
  onClose: () => void;
}

const EditDeviceForm: React.FC<EditDeviceFormProps> = ({
  device,
  users,
  onSubmit,
  onDelete,
  onClose,
}) => {
  const [name, setName] = useState(device.name);
  const [brand, setBrand] = useState(device.brand || "");
  const [ipAddress, setIpAddress] = useState(device.ipAddress || "");
  const [macAddress, setMacAddress] = useState(device.macAddress || "");
  const [status, setStatus] = useState(device.status || "");
  const [userId, setUserId] = useState<number | undefined | null>(
    device.userId
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...device,
      name,
      brand,
      ipAddress,
      macAddress,
      status,
      userId,
    });
  };

  const handleDelete = () => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar este dispositivo?")
    ) {
      onDelete(device.id);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Editar Dispositivo</h2>
      <div className="mb-4">
        <label className="block mb-2">Nombre</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Marca</label>
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">IP</label>
        <input
          type="text"
          value={ipAddress}
          onChange={(e) => setIpAddress(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">MAC</label>
        <input
          type="text"
          value={macAddress}
          onChange={(e) => setMacAddress(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Estado</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as DeviceStatus)}
          className="border p-2 rounded w-full"
        >
          <option value="">Seleccionar estado</option>
          {Object.values(DeviceStatus).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Usuario</label>
        <select
          value={userId || ""}
          onChange={(e) => setUserId(parseInt(e.target.value))}
          className="border p-2 rounded w-full"
        >
          <option value="">Sin usuario asignado</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded mr-2"
        >
          Eliminar
        </button>
        <div>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Guardar
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditDeviceForm;