import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

function moreleImages(id: number, indices: number[], ext = "jpg") {
  return indices.map(
    (i) => `https://images.morele.net/i1064/${id}_${i}_i1064.${ext}`,
  );
}

async function main() {
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.user.deleteMany();

  const categories = [
    {
      name: "Mouse",
      image: "https://i.ibb.co/97HgtGf/mouse.png",
      description:
        "Explore our diverse selection of electronic mice for sale, featuring cutting-edge technology, ergonomic designs, and unbeatable prices. Shop now!",
      products: [
        {
          name: "Logitech G502 HERO",
          price: 34.99,
          originalPrice: 54.99,
          stock: 34,
          images: moreleImages(4143406, [14, 15, 16, 17, 18, 19, 20, 21]),
        },
        {
          name: "Razer DeathAdder V3",
          price: 69.99,
          stock: 21,
          images: moreleImages(12706004, [0, 1, 2, 3, 4, 5]),
        },
        {
          name: "Logitech MX Master 3S",
          price: 99.99,
          stock: 15,
          images: moreleImages(
            10582286,
            [17, 18, 20, 21, 22, 23, 26, 27, 28, 29, 30, 31, 32],
          ),
        },
        {
          name: "SteelSeries Rival 5",
          price: 49.99,
          stock: 40,
          images: moreleImages(5947520, [0, 1, 2, 3, 4, 5]),
        },
        {
          name: "Corsair Dark Core RGB Pro",
          price: 89.99,
          stock: 18,
          images: moreleImages(
            6503618,
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
          ),
        },
      ],
    },
    {
      name: "Monitor",
      image: "https://i.ibb.co/Lz8sd8rH/laptop-PNG5872.png",
      description:
        "Explore our diverse selection of monitors for sale, featuring crisp displays, sleek designs, and unbeatable prices. Shop now!",
      products: [
        {
          name: "LG UltraGear 27GP850",
          price: 379.99,
          stock: 12,
          images: moreleImages(12692786, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
        },
        {
          name: "Samsung Odyssey G7",
          price: 449.99,
          stock: 9,
          images: moreleImages(6869198, [0, 1, 2, 3, 4, 5, 6, 7]),
        },
        {
          name: "Dell UltraSharp U2723QE",
          price: 549.99,
          stock: 7,
          images: moreleImages(9918022, [0, 1, 2, 3, 4, 5, 6, 7]),
        },
        {
          name: "ASUS ROG Swift PG279QM",
          price: 629.99,
          stock: 6,
          images: moreleImages(9375430, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
        },
        {
          name: "BenQ PD2700U",
          price: 429.99,
          stock: 11,
          images: moreleImages(
            4142126,
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
          ),
        },
      ],
    },
    {
      name: "Keyboard",
      image: "https://i.ibb.co/93czP8Qg/keyboard-PNG101843.png",
      description:
        "Explore our diverse selection of keyboards for sale, featuring responsive keys, durable builds, and unbeatable prices. Shop now!",
      products: [
        {
          name: "Logitech G Pro X",
          price: 129.99,
          stock: 25,
          images: moreleImages(14439473, [0, 1, 2, 3, 4, 5, 6, 7, 8]),
        },
        {
          name: "Razer BlackWidow V4",
          price: 149.99,
          stock: 17,
          images: moreleImages(12706002, [1, 2, 3]),
        },
        {
          name: "Keychron K8",
          price: 79.99,
          stock: 30,
          images: moreleImages(11649020, [0]),
        },
        {
          name: "Corsair K70 RGB",
          price: 159.99,
          stock: 14,
          images: moreleImages(9620647, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
        },
        {
          name: "SteelSeries Apex Pro",
          price: 199.99,
          stock: 10,
          images: moreleImages(13062697, [0]),
        },
      ],
    },
    {
      name: "Headphone",
      image: "https://i.ibb.co/cpXk4Hn/headphones.png",
      description:
        "Explore our diverse selection of headphones for sale, featuring immersive sound, comfortable fit, and unbeatable prices. Shop now!",
      products: [
        {
          name: "Sony WH-1000XM5",
          price: 349.99,
          stock: 20,
          images: moreleImages(10818330, [0, 1, 2, 3, 4, 5, 6]),
        },
        {
          name: "SteelSeries Arctis Nova Pro",
          price: 329.99,
          stock: 13,
          images: moreleImages(10525705, [0, 1, 2, 3, 4, 5, 6], "jpeg"),
        },
        {
          name: "HyperX Cloud II",
          price: 89.99,
          stock: 28,
          images: moreleImages(713089, [0, 1, 3, 4, 6, 7, 8, 9]),
        },
        {
          name: "Sennheiser HD 660S",
          price: 399.99,
          stock: 8,
          images: moreleImages(5388869, [0, 1, 2, 3, 4]),
        },
        {
          name: "Razer BlackShark V2",
          price: 99.99,
          stock: 22,
          images: moreleImages(5943602, [0, 1, 2, 3, 4, 5, 6, 7]),
        },
      ],
    },
    {
      name: "Webcam",
      image: "https://i.ibb.co/cSSV6RFf/webcam.png",
      description:
        "Explore our diverse selection of webcams for sale, featuring sharp resolution, easy setup, and unbeatable prices. Shop now!",
      products: [
        {
          name: "Logitech C920",
          price: 69.99,
          stock: 26,
          images: moreleImages(770694, [4, 5, 6, 7, 8, 9, 10, 11, 12]),
        },
        {
          name: "Razer Kiyo Pro",
          price: 149.99,
          stock: 12,
          images: moreleImages(5946736, [0, 1, 2, 3, 4, 5, 6, 7]),
        },
        {
          name: "Elgato Facecam",
          price: 179.99,
          stock: 9,
          images: moreleImages(5948819, [1]),
        },
        {
          name: "Logitech Brio 4K",
          price: 199.99,
          stock: 7,
          images: moreleImages(9269427, [0, 1, 2]),
        },
        {
          name: "AverMedia PW513",
          price: 349.99,
          stock: 4,
          images: moreleImages(8542124, [0, 1, 2, 3]),
        },
      ],
    },
  ];

  const brandNames = new Set(
    categories.flatMap(({ products }) =>
      products.map((p) => p.name.split(" ")[0]),
    ),
  );

  // Logos from Simple Icons (https://cdn.simpleicons.org/<slug>) where the
  // brand is listed there, otherwise a direct Wikimedia Commons asset.
  // All URLs verified (200 OK) before adding.
  const BRAND_LOGOS: Record<string, string> = {
    Razer: "https://cdn.simpleicons.org/razer",
    SteelSeries: "https://cdn.simpleicons.org/steelseries",
    Corsair: "https://cdn.simpleicons.org/corsair",
    LG: "https://cdn.simpleicons.org/lg",
    Samsung: "https://cdn.simpleicons.org/samsung",
    Dell: "https://cdn.simpleicons.org/dell",
    ASUS: "https://cdn.simpleicons.org/asus",
    Sony: "https://cdn.simpleicons.org/sony",
    HyperX: "https://cdn.simpleicons.org/hyperx",
    Sennheiser: "https://cdn.simpleicons.org/sennheiser",
    Elgato: "https://cdn.simpleicons.org/elgato",
    BenQ: "https://upload.wikimedia.org/wikipedia/commons/6/6c/BenQ-Logo.svg",
    Keychron:
      "https://upload.wikimedia.org/wikipedia/commons/6/69/Keychron_logo.svg",
    AverMedia:
      "https://upload.wikimedia.org/wikipedia/commons/0/0b/AVerMedia_Logo.png",
    Logitech:
      "https://upload.wikimedia.org/wikipedia/commons/1/17/Logitech_logo.svg",
  };

  const brandsByName = new Map<string, number>();
  for (const name of brandNames) {
    const brand = await prisma.brand.create({
      data: { name, logoUrl: BRAND_LOGOS[name] ?? null },
    });
    brandsByName.set(name, brand.id);
  }

  for (const { products, ...category } of categories) {
    const createdCategory = await prisma.category.create({
      data: category,
    });

    for (const product of products) {
      const brandName = product.name.split(" ")[0];
      await prisma.product.create({
        data: {
          name: product.name,
          description: `${product.name} - a top pick from our ${category.name} lineup, combining reliable performance with great value.`,
          price: product.price,
          originalPrice:
            "originalPrice" in product ? product.originalPrice : null,
          stock: product.stock,
          images: product.images,
          categoryId: createdCategory.id,
          brandId: brandsByName.get(brandName),
        },
      });
    }
  }

  const users = await Promise.all(
    [
      { name: "Anna", email: "anna@test.com", password: "anna123" },
      { name: "Bartek", email: "bartek@test.com", password: "bartek123" },
      { name: "Celina", email: "celina@test.com", password: "celina123" },
    ].map(async ({ name, email, password }) => ({
      name,
      email,
      passwordHash: await bcrypt.hash(password, 10),
    })),
  );

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
