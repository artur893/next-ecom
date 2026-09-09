import { prisma } from "@/lib/prisma";
import CategoryCarousel from "@/app/components/ui/CategoryCarousel";
import CategorySection from "@/app/components/ui/CategorySection";

export default async function Home() {
  const categories = await prisma.category.findMany();
  return (
    <>
      <CategoryCarousel categories={categories} />
      <CategorySection />
    </>
  );
}
