export type UserType = "Customer" | "Worker" | "Admin";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  userType: UserType;
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  userType: UserType;
}

export type UpdateUserDto = Partial<CreateUserDto>

export interface PaginatedResponse<T> {
  results: T[];
  totalResults: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
