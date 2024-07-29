import Link from "next/link";
import React from "react";

const Navbar: React.FC = () => (
  <nav className="flex flex-col sm:flex-row sm:justify-between items-center p-4 bg-gray-900 text-white shadow-lg">
    <div className="text-2xl font-bold hidden sm:block">MiApp</div>
    <div className="flex space-x-4 sm:space-x-8">
      <Link
        href="/"
        className="text-base sm:text-lg hover:text-blue-400 transition duration-300"
      >
        HOME
      </Link>
      <Link
        href="/devices"
        className="text-base sm:text-lg hover:text-blue-400 transition duration-300"
      >
        Inventario
      </Link>
      <Link
        href="/users"
        className="text-base sm:text-lg hover:text-blue-400 transition duration-300"
      >
        Usuarios
      </Link>
    </div>
  </nav>
);

export default Navbar;
