// repositories.ts
import { BaseRepository } from './base.repository';
import { User, Course, Booking } from './models';

// Sample static data
const initialUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'student' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'teacher' },
  { id: '3', name: 'Admin User', email: 'admin@example.com', role: 'admin' }
];

const initialCourses: Course[] = [
  { id: '1', title: 'TypeScript Fundamentals', description: 'Learn TypeScript from scratch', price: 99, duration: 10 },
  { id: '2', title: 'Advanced Node.js', description: 'Deep dive into Node.js', price: 149, duration: 15 },
  { id: '3', title: 'React with TypeScript', description: 'Build React apps with TypeScript', price: 129, duration: 12 }
];

const initialBookings: Booking[] = [
  { id: '1', userId: '1', courseId: '1', date: new Date('2023-06-15'), status: 'confirmed' },
  { id: '2', userId: '1', courseId: '2', date: new Date('2023-07-20'), status: 'pending' },
  { id: '3', userId: '2', courseId: '3', date: new Date('2023-08-10'), status: 'confirmed' }
];

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(initialUsers);
  }

  // Additional method specific to users
  async getByEmail(email: string): Promise<User | undefined> {
    return this.items.find(user => user.email === email);
  }
}

export class CourseRepository extends BaseRepository<Course> {
  constructor() {
    super(initialCourses);
  }

  // Additional method specific to courses
  async getByPriceRange(min: number, max: number): Promise<Course[]> {
    return this.items.filter(course => course.price >= min && course.price <= max);
  }
}

export class BookingRepository extends BaseRepository<Booking> {
  constructor() {
    super(initialBookings);
  }

  // Additional method specific to bookings
  async getByStatus(status: Booking['status']): Promise<Booking[]> {
    return this.find({ status });
  }

  async getByUser(userId: string): Promise<Booking[]> {
    return this.find({ userId });
  }
}