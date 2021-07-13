import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.city.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "Jakarta Pusat",
    }
  });
  await prisma.city.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: "Jakarta Selatan",
    }
  });
  await prisma.city.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      name: "Jakarta Barat",
    }
  });
  await prisma.city.upsert({
    where: { id: 4 },
    update: {},
    create: {
      id: 4,
      name: "Jakarta Utara",
    }
  });
  await prisma.city.upsert({
    where: { id: 5 },
    update: {},
    create: {
      id: 5,
      name: "Jakarta Timur",
    }
  });
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
