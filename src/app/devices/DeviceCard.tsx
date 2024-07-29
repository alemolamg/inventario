import React from "react";
import { Device } from "../../models/Device";

interface DeviceCardProps {
  device: Device;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device }) => (
  <div>
    <h2>{device.name}</h2>
    <p>Marca: {device.brand}</p>
    <p>Estado: {device.status}</p>
    {/* Muestra más detalles según sea necesario */}
  </div>
);

export default DeviceCard;
