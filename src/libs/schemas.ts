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
  user?: Profile;
  isLoading: boolean;
  refreshUser: Function;
  signOut: Function;
}