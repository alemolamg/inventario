import React, { useState } from "react";
import { WorkZone } from "@/models/WorkZone";
import { User } from "@/models/User";
import { CloudArrowDownIcon } from "@heroicons/react/20/solid";

interface AddUserFormProps {
  onSubmit: (user: Omit<User, "id">) => void;
  onClose: () => void;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ onSubmit, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [workZone, setWorkZone] = useState<WorkZone | "">("");
  const [contact, setContact] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, workZone: workZone as WorkZone, contact });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Añadir Usuario</h2>
      <div className="mb-2">
        <label className="block">Nombre:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full dark:bg-gray-900"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-full dark:bg-gray-900"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block">Zona de trabajo:</label>
        <select
          value={workZone}
          onChange={(e) => setWorkZone(e.target.value as WorkZone)}
          className="border p-2 rounded w-full dark:bg-gray-900"
          required
        >
          <option value="">Seleccionar zona de trabajo</option>
          {Object.values(WorkZone).map((zone) => (
            <option key={zone} value={zone}>
              {zone}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label className="block">Contacto:</label>
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="border p-2 rounded w-full dark:bg-gray-900"
        />
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

export default AddUserForm;
