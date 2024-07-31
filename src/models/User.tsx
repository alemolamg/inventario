import { WorkZone } from "@/models/WorkZone";

export type User = {
  id: number;
  name: string;
  workZone?: WorkZone;
  contact?: string;
  email?: string;
};
