import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const person: any[] = [];

  Array.from({ length: 100 }).forEach(() => {
    const sex = faker.name.sexType();
    const date = faker.date.between(
      '2020-01-01T00:00:00.000Z',
      '2023-01-01T00:00:00.000Z',
    );

    person.push({
      firstName: faker.name.firstName(sex),
      middleName: faker.name.middleName(sex),
      lastName: faker.name.lastName(sex),
      sex,
      avatar: faker.image.avatar(),
      createdAt: date,
      modifiedAt: date,
    });
  });

  await Promise.all(
    person.map(async (user) => {
      await prisma.person.create({
        data: user,
      });
    }),
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
