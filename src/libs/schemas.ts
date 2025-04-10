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

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  category: Category;
  images: ProductImage[];
  createdAt: Date;
}

export interface ProductWithPagination {
  data: Product[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  };
}

export interface ProductImage {
  id: number;
  imageUrl: string;
  createdAt: Date;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
}
