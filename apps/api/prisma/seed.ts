/*import { PrismaClient, VehicleType, RentalStatus } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const host = await prisma.user.create({
    data: {
      firstName: 'Marko',
      lastName: 'Marković',
      email: 'marko@example.com',
      password: await hash('hashedpassword1', 10),
      dateOfBirth: new Date('1990-01-01'),
      personPhoto: 'https://example.com/profile-host.jpg',
      role: 'BOTH',
      driverLicense: 'https://example.com/vozacka.pdf',
      idCard: 'https://example.com/osobna.pdf',
      phoneNumber: '0912345678',
      address: 'Split, Hrvatska',
      bankAccount: 'HR1234567890',
      isVerified: true,
      description:
        'Pozdrav, ja sam Marko. Kada ne koristim svoj auto volim ga iznajmiti.',
    },
  });

  const guest = await prisma.user.create({
    data: {
      firstName: 'Ana',
      lastName: 'Anić',
      email: 'ana@example.com',
      password: await hash('hashedpassword1', 10),
      dateOfBirth: new Date('1995-05-10'),
      personPhoto: 'https://example.com/profile-guest.jpg',
      role: 'USER',
      driverLicense: 'https://example.com/vozacka-ana.pdf',
      idCard: 'https://example.com/osobna-ana.pdf',
      phoneNumber: '0991234567',
      address: 'Zagreb, Hrvatska',
      bankAccount: 'HR0987654321',
      isVerified: false,
    },
  });

  // Create vehicle
  const vehicle = await prisma.vehicle.create({
    data: {
      ownerId: host.id,
      brand: 'Porsche',
      model: 'GT2RS',
      images: ['https://example.com/gt2rs.jpg'],
      productionYear: 2020,
      dailyPrice: 210,
      description: 'Savršeno očuvan sportski automobil.',
      vehicleLicenseImg: 'https://example.com/vozilo.pdf',
      registration: 'ST-1234-AA',
      registrationExpiration: '2025-12-31T00:00:00Z',
      pickupAddress: 'Split centar',
      city: 'Split',
      longitude: 16.4402,
      latitude: 43.5081,
      vehicleType: VehicleType.CAR,
      details: { fuel: 'PETROL', transmission: 'AUTOMATIC' },
      features: { seats: 2, airConditioning: true },
      isVerified: true,
    },
  });

  // Create rental
  const rental = await prisma.rental.create({
    data: {
      renterId: guest.id,
      vehicleId: vehicle.id,
      startDate: '2025-05-05T00:00:00Z',
      endDate: '2025-05-10T00:00:00Z',
      totalPrice: 420,
      status: RentalStatus.COMPLETED,
    },
  });

  // Create review
  await prisma.review.create({
    data: {
      rentalId: rental.id,
      rating: 4,
      comment: 'Sve je bilo super. Definitivno preporučam!',
    },
  });
}

main()
  .then(() => {
    console.log('✅ Seed completed.');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });*/
