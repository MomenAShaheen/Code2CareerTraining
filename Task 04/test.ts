// test.ts
import { UserRepository, CourseRepository, BookingRepository } from './repositories';

async function testRepositories() {
  // Create repository instances
  const userRepo = new UserRepository();
  const courseRepo = new CourseRepository();
  const bookingRepo = new BookingRepository();

  // Test UserRepository
  console.log('=== Testing UserRepository ===');
  console.log('All users:', await userRepo.getAll());
  console.log('User with ID 2:', await userRepo.getById('2'));
  console.log('User with email john@example.com:', await userRepo.getByEmail('john@example.com'));
  
  const newUser = await userRepo.create({
    name: 'New User',
    email: 'new@example.com',
    role: 'student'
  });
  console.log('Created new user:', newUser);
  
  const updatedUser = await userRepo.update(newUser.id, { name: 'Updated User' });
  console.log('Updated user:', updatedUser);
  
  const deleted = await userRepo.delete(newUser.id);
  console.log('User deleted:', deleted);
  
  console.log('Teachers:', await userRepo.find({ role: 'teacher' }));

  // Test CourseRepository
  console.log('\n=== Testing CourseRepository ===');
  console.log('All courses:', await courseRepo.getAll());
  console.log('Course with ID 1:', await courseRepo.getById('1'));
  
  const newCourse = await courseRepo.create({
    title: 'New Course',
    description: 'Brand new course',
    price: 199,
    duration: 20
  });
  console.log('Created new course:', newCourse);
  
  console.log('Courses between $100 and $150:', await courseRepo.getByPriceRange(100, 150));
  
  const deletedCourse = await courseRepo.delete(newCourse.id);
  console.log('Course deleted:', deletedCourse);

  // Test BookingRepository
  console.log('\n=== Testing BookingRepository ===');
  console.log('All bookings:', await bookingRepo.getAll());
  console.log('Confirmed bookings:', await bookingRepo.getByStatus('confirmed'));
  console.log('Bookings for user 1:', await bookingRepo.getByUser('1'));
  
  const newBooking = await bookingRepo.create({
    userId: '2',
    courseId: '1',
    date: new Date('2023-09-01'),
    status: 'pending'
  });
  console.log('Created new booking:', newBooking);
  
  const updatedBooking = await bookingRepo.update(newBooking.id, { status: 'confirmed' });
  console.log('Updated booking:', updatedBooking);
  
  const deletedBooking = await bookingRepo.delete(newBooking.id);
  console.log('Booking deleted:', deletedBooking);
}

testRepositories().catch(console.error);