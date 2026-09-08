import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const categories = [
    { name: "Mouse", image: "https://i.ibb.co/97HgtGf/mouse.png" },
    { name: "Monitor", image: "https://i.ibb.co/Lz8sd8rH/laptop-PNG5872.png" },
    {
      name: "Keyboard",
      image: "https://i.ibb.co/93czP8Qg/keyboard-PNG101843.png",
    },
    { name: "Headphone", image: "https://i.ibb.co/cpXk4Hn/headphones.png" },
    { name: "Chair", image: "https://i.ibb.co/B2V5vjMC/chair-PNG6907.png" },
  ];

  const createdCategories = [];

  for (const category of categories) {
    const created = await prisma.category.create({
      data: category,
    });

    createdCategories.push(created);
  }

  for (const category of createdCategories) {
    for (let i = 1; i <= 5; i++) {
      await prisma.product.create({
        data: {
          name: `${category.name} produkt ${i}`,
          description: `Opis produktu ${i} z kategorii ${category.name}`,
          price: Number((i * 99.99).toFixed(2)),
          stock: 20 + i,
          imageUrl:
            "https://images.unsplash.com/photo-1524758631624-e2822e304c36",
          categoryId: category.id,
        },
      });
    }
  }

  const users = [
    { name: "Anna", email: "anna@test.com", passwordHash: "anna" },
    { name: "Bartek", email: "bartek@test.com", passwordHash: "bartek" },
    { name: "Celina", email: "celina@test.com", passwordHash: "celina" },
  ];

  await prisma.user.createMany({
    data: users,
  });

  console.log("Seed zakończony pomyślnie");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
