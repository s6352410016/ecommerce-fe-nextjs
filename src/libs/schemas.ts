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
  refreshUser: () => Promise<void>;
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
  stripeProductId: string;
  stripePriceId: string;
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

export interface Cart extends Product {
  amount: number;
}

export interface CartContextType {
  cart: Cart[];
  addCart: (cart: Cart) => void;
  getCart: () => Cart[];
  setAmount: (id: number, amount?: number) => void;
  getCartById: (id: number) => Cart | undefined;
  deleteCartById: (id: number) => void;
  deleteCart: () => void;
}

export interface Order extends Product {
  quantity: number;
}

export enum OrderStatus {
  PAID = "paid",
  UNPAID = "unpaid",
  OPEN = "open",
}

export interface OrderRes {
  id: string;
  user: Profile;
  totalAmount: number;
  orderStatus: OrderStatus;
  shippingAddress: string;
  phone: string;
  email: string;
  orders: OrderDetails[];
  sessionId: string;
  createdAt: Date;
  updatedAt: Date;
  clientSecret: string;
}

export interface OrderDetails {
  id: number;
  product: Product;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ShippingInfo {
  userId: number;
  shippingAddress: string;
  phone: string;
  email: string;
}