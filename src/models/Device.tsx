export type Device = {
  id: number;
  name: string;
  brand: string;
  ipAddress?: string;
  macAddress?: string;
  description?: string;
  location?: string;
  status?: string;
  distribution?: string;
  userId: number;
};
