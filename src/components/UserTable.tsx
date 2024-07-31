"use client";

import React, { useState, useEffect } from "react";
import { User } from "@/models/User";

interface UserTableProps {
  users: User[];
  onUpdateUser: (updatedUser: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onUpdateUser }) => {
  const [filterName, setFilterName] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

  useEffect(() => {
    let filtered = users;

    if (filterName) {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(filterName.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  }, [filterName, users]);

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
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-4">Usuarios</h1>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
