export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: userRoles;
  createdAt: Date;
  updatedAt: Date;
}

export type userRoles = "ADMIN" | "COACH" | "STUDENT";
