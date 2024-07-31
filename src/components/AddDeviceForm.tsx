import React, { useState } from "react";
import { DeviceStatus, Device } from "@/models/Device";
import { CloudArrowDownIcon } from "@heroicons/react/20/solid";

interface AddDeviceFormProps {
  onSubmit: (device: Omit<Device, "id">) => void;
  onClose: () => void;
}

const AddDeviceForm: React.FC<AddDeviceFormProps> = ({ onSubmit, onClose }) => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [macAddress, setMacAddress] = useState("");
  const [status, setStatus] = useState<DeviceStatus | "">("");
  const [userId, setUserId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, brand, ipAddress, macAddress, status });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Añadir Dispositivo</h2>
      <div className="mb-2">
        <label className="block">Nombre:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block">Marca:</label>
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block">IP:</label>
        <input
          type="text"
          value={ipAddress}
          onChange={(e) => setIpAddress(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="mb-2">
        <label className="block">MAC:</label>
        <input
          type="text"
          value={macAddress}
          onChange={(e) => setMacAddress(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="mb-2">
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
      {/* <div className="mb-2">
        <label className="block">Usuario:</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div> */}
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
