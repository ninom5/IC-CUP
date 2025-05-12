import {
  PrismaClient,
  Role,
  VehicleType,
  RentalStatus,
  FuelType,
  CarCategory,
  Transmission,
} from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: await hash('hashedpassword1', 10),
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
      password: await hash('hashedpassword2', 10),
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
      latitude: 12.3456,
      longitude: 78.9012,
    },
  });

  const location2 = await prisma.location.create({
    data: {
      address: '5678 Oak St, Another City',
      city: 'Another City',
      latitude: 23.4567,
      longitude: 89.0123,
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
      pickupAddress: 'some address',
      city: 'Split',
      latitude: 43.51813,
      longitude: 16.45019,
      vehicleType: VehicleType.CAR,
      registrationExpiration: '2025-12-31T00:00:00Z',
      details: {
        fuelType: FuelType.PETROL,
        carCategory: CarCategory.HATCHBACK,
        seats: '7',
        transmission: Transmission.MANUAL,
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
      pickupAddress: 'some address 3',
      city: 'Split',
      latitude: 43.54813,
      longitude: 16.45319,
      vehicleType: VehicleType.CAR,
      details: {
        fuelType: FuelType.PETROL,
        carCategory: CarCategory.SUV,
        seats: '2',
        transmission: Transmission.MANUAL,
      },
      registrationExpiration: '2025-12-31T00:00:00Z',
    },
  });

  const vehicle3 = await prisma.vehicle.create({
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
      pickupAddress: 'some address 3',
      city: 'Split',
      latitude: 43.54813,
      longitude: 16.45319,
      vehicleType: VehicleType.CAR,
      details: {
        fuelType: FuelType.DIESEL,
        carCategory: CarCategory.COUPE,
        seats: '2',
        transmission: Transmission.MANUAL,
      },
      registrationExpiration: '2025-12-31T00:00:00Z',
    },
  });

  const vehicle4 = await prisma.vehicle.create({
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
      pickupAddress: 'some address 3',
      city: 'Split',
      latitude: 43.54813,
      longitude: 16.45419,
      vehicleType: VehicleType.CAR,
      details: {
        fuelType: FuelType.PETROL,
        carCategory: CarCategory.COUPE,
        seats: '2',
        transmission: Transmission.MANUAL,
      },
      registrationExpiration: '2025-12-31T00:00:00Z',
    },
  });

  const vehicle5 = await prisma.vehicle.create({
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
      pickupAddress: 'some address 3',
      city: 'Split',
      latitude: 43.54813,
      longitude: 16.45329,
      vehicleType: VehicleType.CAR,
      details: {
        fuelType: FuelType.PETROL,
        carCategory: CarCategory.COUPE,
        seats: '2',
        transmission: Transmission.MANUAL,
      },
      registrationExpiration: '2025-12-31T00:00:00Z',
    },
  });

  const vehicle6 = await prisma.vehicle.create({
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
      pickupAddress: 'some address 3',
      city: 'Split',
      latitude: 43.54813,
      longitude: 16.54319,
      vehicleType: VehicleType.CAR,
      details: {
        fuelType: FuelType.PETROL,
        carCategory: CarCategory.COUPE,
        seats: '2',
        transmission: Transmission.MANUAL,
      },
      registrationExpiration: '2025-12-31T00:00:00Z',
    },
  });

  const vehicle7 = await prisma.vehicle.create({
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
      pickupAddress: 'some address 3',
      city: 'Split',
      latitude: 43.51813,
      longitude: 16.45319,
      vehicleType: VehicleType.CAR,
      details: {
        fuelType: FuelType.DIESEL,
        carCategory: CarCategory.SEDAN,
        seats: '5',
        transmission: Transmission.AUTOMATIC,
      },
      registrationExpiration: '2025-12-31T00:00:00Z',
    },
  });
  const vehicle8 = await prisma.vehicle.create({
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
      pickupAddress: 'some address 3',
      city: 'Split',
      latitude: 43.55313,
      longitude: 16.45319,
      vehicleType: VehicleType.CAR,
      details: {
        fuelType: FuelType.DIESEL,
        carCategory: CarCategory.SEDAN,
        seats: '5',
        transmission: Transmission.AUTOMATIC,
      },
      registrationExpiration: '2025-12-31T00:00:00Z',
    },
  });
  const vehicle9 = await prisma.vehicle.create({
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
      pickupAddress: 'some address 3',
      city: 'Split',
      latitude: 43.54813,
      longitude: 16.45221,
      vehicleType: VehicleType.CAR,
      details: {
        fuelType: FuelType.DIESEL,
        carCategory: CarCategory.SEDAN,
        seats: '5',
        transmission: Transmission.AUTOMATIC,
      },
      registrationExpiration: '2025-12-31T00:00:00Z',
    },
  });
  const vehicle10 = await prisma.vehicle.create({
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
      pickupAddress: 'some address 3',
      city: 'Split',
      latitude: 43.54831,
      longitude: 16.45319,
      vehicleType: VehicleType.CAR,
      details: {
        fuelType: FuelType.DIESEL,
        carCategory: CarCategory.SUV,
        seats: '5',
        transmission: Transmission.AUTOMATIC,
      },
      registrationExpiration: '2025-12-31T00:00:00Z',
    },
  });
  const vehicle11 = await prisma.vehicle.create({
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
      pickupAddress: 'some address 3',
      city: 'Split',
      latitude: 43.54813,
      longitude: 16.45328,
      vehicleType: VehicleType.CAR,
      details: {
        fuelType: FuelType.DIESEL,
        carCategory: CarCategory.SUV,
        seats: '5',
        transmission: Transmission.AUTOMATIC,
      },
      registrationExpiration: '2025-12-31T00:00:00Z',
    },
  });

  const vehicle12 = await prisma.vehicle.create({
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
      pickupAddress: 'some address 3',
      city: 'Split',
      latitude: 43.54813,
      longitude: 16.45419,
      vehicleType: VehicleType.CAR,
      details: {
        fuelType: FuelType.DIESEL,
        carCategory: CarCategory.SUV,
        seats: '5',
        transmission: Transmission.AUTOMATIC,
      },
      registrationExpiration: '2025-12-31T00:00:00Z',
    },
  });

  const vehicle13 = await prisma.vehicle.create({
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
      pickupAddress: 'some address 3',
      city: 'Split',
      latitude: 43.55813,
      longitude: 16.45319,
      vehicleType: VehicleType.CAR,
      details: {
        fuelType: FuelType.DIESEL,
        carCategory: CarCategory.SUV,
        seats: '5',
        transmission: Transmission.AUTOMATIC,
      },
      registrationExpiration: '2025-12-31T00:00:00Z',
    },
  });

  const vehicle14 = await prisma.vehicle.create({
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
      pickupAddress: 'some address 3',
      city: 'Split',
      latitude: 43.54813,
      longitude: 16.45315,
      vehicleType: VehicleType.CAR,
      details: {
        fuelType: FuelType.DIESEL,
        carCategory: CarCategory.SUV,
        seats: '5',
        transmission: Transmission.AUTOMATIC,
      },
      registrationExpiration: '2025-12-31T00:00:00Z',
    },
  });

  const vehicle15 = await prisma.vehicle.create({
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
      pickupAddress: 'some address 3',
      city: 'Split',
      latitude: 43.54823,
      longitude: 16.45319,
      vehicleType: VehicleType.CAR,
      details: {
        fuelType: FuelType.DIESEL,
        carCategory: CarCategory.SUV,
        seats: '5',
        transmission: Transmission.AUTOMATIC,
      },
      registrationExpiration: '2025-12-31T00:00:00Z',
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
