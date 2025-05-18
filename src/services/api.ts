import axios from "axios";
import {
  ApiResponse,
  PaginatedResponse,
  Product,
  User,
  Order,
  NewsArticle,
} from "@/types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Auth APIs
export const authApi = {
  login: async (
    email: string,
    password: string
  ): Promise<ApiResponse<User>> => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },
  register: async (
    email: string,
    password: string,
    name: string
  ): Promise<ApiResponse<User>> => {
    const response = await api.post("/auth/register", {
      email,
      password,
      name,
    });
    return response.data;
  },
  logout: async (): Promise<ApiResponse<void>> => {
    const response = await api.post("/auth/logout");
    return response.data;
  },
  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    const response = await api.get("/auth/me");
    return response.data;
  },
};

// Product APIs
export const productApi = {
  getProducts: async (
    page = 1,
    limit = 10,
    filters?: {
      category?: string;
      sort?: string;
      search?: string;
    }
  ): Promise<PaginatedResponse<Product>> => {
    const params = {
      page,
      limit,
      ...filters,
    };
    const response = await api.get(`/products`, { params });
    return response.data;
  },
  getProduct: async (id: string): Promise<ApiResponse<Product>> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
  searchProducts: async (query: string): Promise<ApiResponse<Product[]>> => {
    const response = await api.get(`/products/search?q=${query}`);
    return response.data;
  },
};

// Order APIs
export const orderApi = {
  createOrder: async (
    items: { productId: string; quantity: number }[]
  ): Promise<ApiResponse<Order>> => {
    const response = await api.post("/orders", { items });
    return response.data;
  },
  getOrders: async (): Promise<ApiResponse<Order[]>> => {
    const response = await api.get("/orders");
    return response.data;
  },
  getOrder: async (id: string): Promise<ApiResponse<Order>> => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },
};

// News APIs
// News APIs
export const newsApi = {
  getNews: async (page = 1, limit = 10): Promise<PaginatedResponse<NewsArticle>> => {
    const response = await api.get(`/news?page=${page}&limit=${limit}`);
    return Array.isArray(response.data)
      ? { data: response.data, total: response.data.length, page, limit, totalPages: Math.ceil(response.data.length / limit) }
      : response.data;
  },
  getNewsArticle: async (id: string): Promise<ApiResponse<NewsArticle>> => {
    const response = await api.get(`/news/${id}`);
    return response.data;
  },
};

export default api;
