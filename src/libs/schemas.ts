export interface Profile {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: "customer" | "admin";
  avatar: string;
  provider: "local" | "google" | "github";
  providerId: string;
  createdAt: Date;
  isLoading: boolean;
}

export interface UserContextType {
  user: Profile | null;
  isLoading: boolean;
  refreshUser: Function;
}

export interface Categories {
  label: string;
  value: string;
}