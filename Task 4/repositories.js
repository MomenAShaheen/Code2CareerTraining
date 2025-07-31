"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRepository = exports.CourseRepository = exports.UserRepository = void 0;
// repositories.ts
const base_repository_1 = require("./base.repository");
// Sample static data
const initialUsers = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'student' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'teacher' },
    { id: '3', name: 'Admin User', email: 'admin@example.com', role: 'admin' }
];
const initialCourses = [
    { id: '1', title: 'TypeScript Fundamentals', description: 'Learn TypeScript from scratch', price: 99, duration: 10 },
    { id: '2', title: 'Advanced Node.js', description: 'Deep dive into Node.js', price: 149, duration: 15 },
    { id: '3', title: 'React with TypeScript', description: 'Build React apps with TypeScript', price: 129, duration: 12 }
];
const initialBookings = [
    { id: '1', userId: '1', courseId: '1', date: new Date('2023-06-15'), status: 'confirmed' },
    { id: '2', userId: '1', courseId: '2', date: new Date('2023-07-20'), status: 'pending' },
    { id: '3', userId: '2', courseId: '3', date: new Date('2023-08-10'), status: 'confirmed' }
];
class UserRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(initialUsers);
    }
    // Additional method specific to users
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.items.find(user => user.email === email);
        });
    }
}
exports.UserRepository = UserRepository;
class CourseRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(initialCourses);
    }
    // Additional method specific to courses
    getByPriceRange(min, max) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.items.filter(course => course.price >= min && course.price <= max);
        });
    }
}
exports.CourseRepository = CourseRepository;
class BookingRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(initialBookings);
    }
    // Additional method specific to bookings
    getByStatus(status) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.find({ status });
        });
    }
    getByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.find({ userId });
        });
    }
}
exports.BookingRepository = BookingRepository;
