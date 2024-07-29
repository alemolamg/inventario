export type Device = {
  id: number;
  name: string;
  brand?: string | null;
  ipAddress?: string | null;
  macAddress?: string | null;
  description?: string | null;
  location?: string | null;
  status?: string | null;
  distribution?: string | null;
  userId?: number | null;
};
