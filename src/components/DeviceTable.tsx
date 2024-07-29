import React from "react";
import { Device } from "../models/Device";

interface DeviceTableProps {
  devices: Device[];
}

const DeviceTable: React.FC<DeviceTableProps> = ({ devices }) => (
  <div>
    <h1>Inventario de Dispositivos</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Marca</th>
          <th>IP</th>
          <th>MAC</th>
          <th>Estado</th>
          <th>Usuario</th>
        </tr>
      </thead>
      <tbody>
        {devices.map((device) => (
          <tr key={device.id}>
            <td>{device.id}</td>
            <td>{device.name}</td>
            <td>{device.brand}</td>
            <td>{device.ipAddress || "N/A"}</td>
            <td>{device.macAddress || "N/A"}</td>
            <td>{device.status || "N/A"}</td>
            <td>{device.userId ?? "N/A"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DeviceTable;
