import {
  PrismaClient,
  Role,
  VehicleType,
  RentalStatus,
  FuelType,
  CarCategory,
} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'hashedpassword1',
      dateOfBirth: new Date('1990-01-01'),
      personPhoto: 'https://example.com/image.jpg',
      driverLicense: 'A123456789',
      idCard: 'ID12345',
      phoneNumber: '123-456-7890',
      address: '1234 Elm St, Some City, Some Country',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      password: 'hashedpassword2',
      dateOfBirth: new Date('1985-02-14'),
      personPhoto: 'https://example.com/image2.jpg',
      driverLicense: 'B987654321',
      idCard: 'ID67890',
      phoneNumber: '987-654-3210',
      address: '5678 Oak St, Another City, Another Country',
    },
  });

  const location1 = await prisma.location.create({
    data: {
      address: '1234 Elm St, Some City',
      city: 'Some City',
      longitude: 12.3456,
      latitude: 78.9012,
    },
  });

  const location2 = await prisma.location.create({
    data: {
      address: '5678 Oak St, Another City',
      city: 'Another City',
      longitude: 23.4567,
      latitude: 89.0123,
    },
  });

  const vehicle1 = await prisma.vehicle.create({
    data: {
      ownerId: user1.id,
      brand: 'Toyota',
      model: 'Corolla',
      images: [
        'https://th.bing.com/th/id/OIP.xfIg1mDKOR34XxxLYKgZywHaE8?w=240&h=180&c=7&r=0&o=5&pid=1.7',
      ],
      productionYear: 2020,
      dailyPrice: 50.0,
      isAvailable: true,
      description: 'A reliable car for everyday use.',
      registration: 'ABC123',
      locationId: location1.id,
      vehicleType: VehicleType.CAR,
      details: {
        fuelType: FuelType.PETROL,
        carCategory: CarCategory.MEDIUM,
      },
    },
  });

  const vehicle2 = await prisma.vehicle.create({
    data: {
      ownerId: user2.id,
      brand: 'Honda',
      model: 'Civic',
      images: [
        'https://th.bing.com/th/id/OIP.KE-N91Vwj3pWxQpVJ9cAngHaEK?w=288&h=180&c=7&r=0&o=5&pid=1.7',
      ],
      productionYear: 2022,
      dailyPrice: 60.0,
      isAvailable: true,
      description: 'A spacious and fuel-efficient car.',
      registration: 'XYZ789',
      locationId: location2.id,
      vehicleType: VehicleType.CAR,
      details: {
        fuelType: FuelType.DIESEL,
        carCategory: CarCategory.MEDIUM,
      },
    },
  });

  const rental1 = await prisma.rental.create({
    data: {
      renterId: user1.id,
      vehicleId: vehicle2.id,
      startDate: new Date('2025-06-01'),
      endDate: new Date('2025-06-07'),
      totalPrice: 420.0,
      status: RentalStatus.PENDING,
    },
  });

  const rental2 = await prisma.rental.create({
    data: {
      renterId: user2.id,
      vehicleId: vehicle1.id,
      startDate: new Date('2025-06-10'),
      endDate: new Date('2025-06-15'),
      totalPrice: 300.0,
      status: RentalStatus.PENDING,
    },
  });

  await prisma.review.create({
    data: {
      rentalId: rental1.id,
      rating: 4.5,
      comment: 'Great car, very smooth drive!',
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
