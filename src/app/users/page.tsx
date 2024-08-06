"use client";

import React, { useState, useEffect } from "react";
import { User } from "@/models/User";
import UserTable from "@/components/UserTable";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleUpdateUser = async (updatedUser: User) => {
    await fetch(`/api/users/${updatedUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });

    // Refresh the users list
    const response = await fetch("/api/users");
    const updatedUsers = await response.json();
    setUsers(updatedUsers);
  };

  const handleDeleteUser = async (userId: number) => {
    await fetch(`/api/users/${userId}`, {
      method: "DELETE",
    });

    // Refresh the users list
    const response = await fetch("/api/users");
    const updatedUsers = await response.json();
    setUsers(updatedUsers);
  };

  return (
    <div>
      <UserTable
        users={users}
        onUpdateUser={handleUpdateUser}
        onDeleteUser={handleDeleteUser}
      />
    </div>
  );
};

export default UsersPage;
