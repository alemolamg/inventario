import React from "react";

interface FiltersProps {
  onFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => (
  <div>
    <select onChange={onFilterChange}>
      <option value="">Todos</option>
      <option value="ordenador">Ordenadores</option>
      <option value="monitor">Monitores</option>
      {/* Añade más opciones según sea necesario */}
    </select>
    {/* Otros filtros */}
  </div>
);

export default Filters;
