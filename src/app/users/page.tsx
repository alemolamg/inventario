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
      <UserTable users={users} onUpdateUser={handleAddUser} />
    </div>
  );
};

export default UsersPage;
