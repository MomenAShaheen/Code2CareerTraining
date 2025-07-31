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
// test.ts
const repositories_1 = require("./repositories");
function testRepositories() {
    return __awaiter(this, void 0, void 0, function* () {
        // Create repository instances
        const userRepo = new repositories_1.UserRepository();
        const courseRepo = new repositories_1.CourseRepository();
        const bookingRepo = new repositories_1.BookingRepository();
        // Test UserRepository
        console.log('=== Testing UserRepository ===');
        console.log('All users:', yield userRepo.getAll());
        console.log('User with ID 2:', yield userRepo.getById('2'));
        console.log('User with email john@example.com:', yield userRepo.getByEmail('john@example.com'));
        const newUser = yield userRepo.create({
            name: 'New User',
            email: 'new@example.com',
            role: 'student'
        });
        console.log('Created new user:', newUser);
        const updatedUser = yield userRepo.update(newUser.id, { name: 'Updated User' });
        console.log('Updated user:', updatedUser);
        const deleted = yield userRepo.delete(newUser.id);
        console.log('User deleted:', deleted);
        console.log('Teachers:', yield userRepo.find({ role: 'teacher' }));
        // Test CourseRepository
        console.log('\n=== Testing CourseRepository ===');
        console.log('All courses:', yield courseRepo.getAll());
        console.log('Course with ID 1:', yield courseRepo.getById('1'));
        const newCourse = yield courseRepo.create({
            title: 'New Course',
            description: 'Brand new course',
            price: 199,
            duration: 20
        });
        console.log('Created new course:', newCourse);
        console.log('Courses between $100 and $150:', yield courseRepo.getByPriceRange(100, 150));
        const deletedCourse = yield courseRepo.delete(newCourse.id);
        console.log('Course deleted:', deletedCourse);
        // Test BookingRepository
        console.log('\n=== Testing BookingRepository ===');
        console.log('All bookings:', yield bookingRepo.getAll());
        console.log('Confirmed bookings:', yield bookingRepo.getByStatus('confirmed'));
        console.log('Bookings for user 1:', yield bookingRepo.getByUser('1'));
        const newBooking = yield bookingRepo.create({
            userId: '2',
            courseId: '1',
            date: new Date('2023-09-01'),
            status: 'pending'
        });
        console.log('Created new booking:', newBooking);
        const updatedBooking = yield bookingRepo.update(newBooking.id, { status: 'confirmed' });
        console.log('Updated booking:', updatedBooking);
        const deletedBooking = yield bookingRepo.delete(newBooking.id);
        console.log('Booking deleted:', deletedBooking);
    });
}
testRepositories().catch(console.error);
