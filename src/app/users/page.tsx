"use client";

import React, { useState, useEffect } from "react";
import { User } from "@/models/User";
import UserTable from "@/components/UserTable";
import Modal from "@/components/Modal";
import AddUserForm from "@/components/AddUserForm";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleAddUser = async (newUser: Omit<User, "id">) => {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    const addedUser = await response.json();
    setUsers((prevUsers) => [...prevUsers, addedUser]);
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Añadir Usuario
      </button>

      <UserTable users={users} onUpdateUser={() => {}} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddUserForm
          onSubmit={handleAddUser}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default UsersPage;
