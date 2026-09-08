import { prisma } from "@/lib/prisma";
import CategoryCarousel from "@/app/components/ui/CategoryCarousel";

export default async function Home() {
  const categories = await prisma.category.findMany();
  return (
    <>
      <CategoryCarousel categories={categories} />
    </>
  );
}
