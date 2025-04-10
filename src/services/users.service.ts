import axios from "axios";
import {
  User,
  CreateUserDto,
  UpdateUserDto,
  PaginatedResponse,
  UserType,
} from "../types/user";

const API_BASE =
  "http://kg00w4owgo0o8okwgk4w4g40.185.229.236.238.sslip.io/users";

export const UsersService = {
  async getAll(params: {
    filter?: string;
    userType?: UserType;
    birthDate?: string;
    page: number;
    pageSize: number;
  }): Promise<PaginatedResponse<User>> {
    const res = await axios.get(`${API_BASE}`, { params });
    return res.data;
  },

  async getById(id: string): Promise<User> {
    const res = await axios.get(`${API_BASE}/${id}`);
    return res.data;
  },

  async create(data: CreateUserDto): Promise<void> {
    await axios.post(API_BASE, data);
  },

  async update(id: string, data: UpdateUserDto): Promise<void> {
    await axios.put(`${API_BASE}/${id}`, data);
  },

  async remove(id: string): Promise<void> {
    await axios.delete(`${API_BASE}/${id}`);
  },
};
