// models.ts
export interface BaseEntity {
  id: string;
}

export interface User extends BaseEntity {
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
}

export interface Course extends BaseEntity {
  title: string;
  description: string;
  price: number;
  duration: number; // in hours
}

export interface Booking extends BaseEntity {
  userId: string;
  courseId: string;
  date: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
}