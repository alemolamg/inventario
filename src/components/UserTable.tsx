"use client";

import React, { useState, useEffect, use } from "react";
import { User } from "@/models/User";
import Modal from "@/components/Modal";
import AddUserForm from "@/components/AddUserForm";
import EditUserForm from "@/components/EditUserForm";
import { UserPlusIcon, PencilIcon } from "@heroicons/react/20/solid";

interface UserTableProps {
  users: User[];
  onUpdateUser: (updatedUser: User) => void;
  onDeleteUser: (userId: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onUpdateUser,
  onDeleteUser,
}) => {
  const [filterName, setFilterName] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    let filtered = users;

    if (filterName) {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(filterName.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  }, [filterName, users]);

  const handleAddUser = async (newUser: Omit<User, "id">) => {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    const addedUser = await response.json();
    setFilteredUsers((prevUsers) => [...prevUsers, addedUser]);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveUser = async (user: User) => {
    await onUpdateUser(user);
    setIsEditModalOpen(false);
    setEditingUser(null);
  };

  const handleDeleteUser = async (userId: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      await onDeleteUser(userId);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Usuarios</h1>
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <AddUserForm
          onSubmit={handleAddUser}
          onClose={() => setIsAddModalOpen(false)}
        />
      </Modal>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        {editingUser && (
          <EditUserForm
            user={editingUser}
            onSubmit={handleSaveUser}
            onDelete={handleDeleteUser}
            onClose={() => setIsEditModalOpen(false)}
          />
        )}
      </Modal>
      <div className="flex justify-between items-center mb-4">
        <div>
          <input
            type="text"
            placeholder="Filtrar por nombre..."
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center bg-green-800 text-white px-4 py-2 rounded"
        >
          <UserPlusIcon className="h-6 w-6 mr-1" />
          Añadir Usuario
        </button>
      </div>

      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border-b border-gray-200 md:table-row">
            <th className="p-2 text-left block md:table-cell">ID</th>
            <th className="p-2 text-left block md:table-cell">Nombre</th>
            <th className="p-2 text-left block md:table-cell">
              Zona de trabajo
            </th>
            <th className="p-2 text-left block md:table-cell">Contacto</th>
            <th className="p-2 text-left block md:table-cell">Email</th>
            <th className="p-2 text-left block md:table-cell">Acciones</th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {filteredUsers.map((user) => (
            <tr key={user.id} className="border-b border-gray-200 md:table-row">
              <td className="p-2 block md:table-cell">{user.id}</td>
              <td className="p-2 block md:table-cell">{user.name}</td>
              <td className="p-2 block md:table-cell">{user.workZone}</td>
              <td className="p-2 block md:table-cell">{user.contact}</td>
              <td className="p-2 block md:table-cell">{user.email}</td>
              <td className="p-2 block md:table-cell">
                <button
                  className="flex items-center bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => handleEditUser(user)}
                >
                  <PencilIcon className="h-5 w-5 mr-2" />
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
