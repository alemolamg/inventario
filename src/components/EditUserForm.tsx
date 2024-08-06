"use client";

import React, { useState } from "react";
import { User } from "@/models/User";
import { CloudArrowDownIcon, TrashIcon } from "@heroicons/react/20/solid";

interface EditUserFormProps {
  user: User;
  onSubmit: (user: User) => void;
  onDelete: (userId: number) => void;
  onClose: () => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({
  user,
  onSubmit,
  onDelete,
  onClose,
}) => {
  const [formData, setFormData] = useState({ ...user });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleDelete = () => {
    if (confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      onDelete(user.id);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Editar Usuario</h2>
      <div className="mb-4">
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="workZone">Zona de trabajo:</label>
        <input
          type="text"
          name="workZone"
          value={formData.workZone}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="contact">Contacto:</label>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="flex justify-between mt-5 items-center">
        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded mr-2 flex items-center"
        >
          <TrashIcon className="h-5 w-5 mr-2" />
          Eliminar
        </button>
        <div className="flex">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded"
          >
            <CloudArrowDownIcon className="h-5 mr-1"/>
            Guardar
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditUserForm;
