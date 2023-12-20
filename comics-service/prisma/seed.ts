import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

import { DEFAULT_GENRES } from './mock.data';

const COMICS_PER_SEEDING = 30;
const AUTHORS_PER_SEEDING = 15;
const MAX_GENRES_PER_COMIC_SEEDING = 3;
const MAX_AUTHORS_PER_COMIC_SEEDING = 3;

const prisma = new PrismaClient();

const genresSeed = async (): Promise<void> => {
  await prisma.genre.createMany({
    data: DEFAULT_GENRES,
    skipDuplicates: true,
  });
};

const authorsSeed = async (): Promise<void> => {
  await prisma.author.createMany({
    data: Array(AUTHORS_PER_SEEDING)
      .fill(null)
      .map(() => ({
        name: faker.person.firstName(),
      })),
  });
};

const comicsSeed = async (): Promise<void> => {
  const allGenres = await prisma.genre.findMany();
  const allAuthors = await prisma.author.findMany();

  await prisma.$transaction(
    Array(COMICS_PER_SEEDING)
      .fill(null)
      .map(() => {
        const randomGenres = faker.helpers.arrayElements(
          allGenres,
          faker.number.int({ min: 1, max: MAX_GENRES_PER_COMIC_SEEDING })
        );
        const randomAuthors = faker.helpers.arrayElements(
          allAuthors,
          faker.number.int({ min: 1, max: MAX_AUTHORS_PER_COMIC_SEEDING })
        );

        return prisma.comic.create({
          data: {
            title: faker.music.songName(),
            desc: faker.lorem.sentences({ min: 1, max: 2 }),
            issueNumber: faker.number.int({ min: 0, max: 100 }),
            rating: faker.number.float({
              precision: 0.1,
            }),
            year: faker.number.int({
              min: 1960,
              max: 2023,
            }),
            img: faker.image.urlPicsumPhotos(),
            edition: faker.color.human(),
            authors: {
              connect: randomAuthors.map(({ id }) => ({ id })),
            },
            genres: {
              connect: randomGenres.map(({ id }) => ({ id })),
            },
          },
        });
      })
  );
};

const main = async (): Promise<void> => {
  try {
    await genresSeed();
    await authorsSeed();
    await comicsSeed();
  } catch (error) {
    console.log(error);
    console.error('Error when seeding database');
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
