import React, { useState, useEffect } from "react";
import { DeviceStatus, Device } from "@/models/Device";
import { User } from "@/models/User"; // Importar el modelo User
import { CloudArrowDownIcon } from "@heroicons/react/20/solid";

interface AddDeviceFormProps {
  onSubmit: (device: Omit<Device, "id">) => void;
  onClose: () => void;
}

const AddDeviceForm: React.FC<AddDeviceFormProps> = ({ onSubmit, onClose }) => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [macAddress, setMacAddress] = useState("");
  const [status, setStatus] = useState<DeviceStatus | "">("");
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState<User[]>([]); // Estado para almacenar los usuarios

  // Obtener la lista de usuarios desde la API
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      brand,
      description,
      ipAddress,
      macAddress,
      status,
      userId: userId ? parseInt(userId) : undefined,
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Añadir Dispositivo</h2>
      <div className="mb-4">
        <label className="block">Nombre:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block">Marca:</label>
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block">Descripción:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block">IP:</label>
        <input
          type="text"
          value={ipAddress}
          onChange={(e) => setIpAddress(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block">MAC:</label>
        <input
          type="text"
          value={macAddress}
          onChange={(e) => setMacAddress(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block">Estado:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as DeviceStatus)}
          className="border p-2 rounded w-full"
          required
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
        <label className="block">Usuario:</label>
        <select
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">Seleccionar usuario</option>
          {users.map((user) => (
            <option key={user.id} value={user.id.toString()}>
              {user.id} - {user.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-600 text-white px-4 py-2 rounded mr-2"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="flex items-center bg-green-800 text-white px-4 py-2 rounded"
        >
          <CloudArrowDownIcon className="h-5 mr-1" />
          Añadir
        </button>
      </div>
    </form>
  );
};

export default AddDeviceForm;
