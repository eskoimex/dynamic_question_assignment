// seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed Regions
  const singapore = await prisma.region.upsert({
    where: { name: 'Singapore' },
    update: {},
    create: {
      name: 'Singapore',
      cycleDuration: 7, // Weekly cycle
      startDate: new Date('2024-01-01T11:00:00Z'), // Monday 7 PM SGT
    },
  });

  const us = await prisma.region.upsert({
    where: { name: 'United States' },
    update: {},
    create: {
      name: 'United States',
      cycleDuration: 7, // Weekly cycle
      startDate: new Date('2024-01-01T11:00:00Z'), // Adjust time if needed for US
    },
  });

  // Seed Questions for Singapore
  await prisma.question.createMany({
    data: [
      {
        content: 'What is your favorite Singaporean food?',
        regionId: singapore.id,
      },
      {
        content: 'What is your favorite place in Singapore?',
        regionId: singapore.id,
      },
      // Add more questions as needed
    ],
  });

  // Seed Questions for the United States
  await prisma.question.createMany({
    data: [
      { content: 'What is your favorite US city?', regionId: us.id },
      { content: 'What is your favorite American food?', regionId: us.id },
      // Add more questions as needed
    ],
  });

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
