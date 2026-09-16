import { ReactNode } from "react";
import { Category } from "@prisma/client";
import { Card, HorizontalScrollSection } from "@/app/components/ui";
import {
  MouseIcon,
  MonitorIcon,
  HeadphoneIcon,
  KeyboardIcon,
  WebcamIcon,
} from "@/app/components/icons";

const CATEGORY_ICONS: Record<string, ReactNode> = {
  Mouse: <MouseIcon />,
  Monitor: <MonitorIcon />,
  Headphone: <HeadphoneIcon />,
  Keyboard: <KeyboardIcon />,
  Webcam: <WebcamIcon />,
};

export const CATEGORY_CARD_SIZE =
  "w-33 h-28 shrink-0 lg:w-46 lg:h-38.5 xl:w-55 xl:h-47.5";

export default function CategorySection({
  categories,
}: {
  categories: Category[];
}) {
  const cards = categories.map((category) => (
    <Card
      key={category.id}
      href={`/product?category=${category.id}`}
      icon={CATEGORY_ICONS[category.name]}
      label={category.name}
      className={CATEGORY_CARD_SIZE}
    />
  ));

  return (
    <>
      <div className="md:hidden">
        <HorizontalScrollSection title="Category" className="mt-0">
          {cards}
        </HorizontalScrollSection>
      </div>

      <section className="hidden md:block">
        <h2 className="text-heading-6 font-medium mt-25 mb-8 lg:text-heading-5 xl:text-heading-4">
          Category
        </h2>
        <div className="flex justify-between">{cards}</div>
      </section>
    </>
  );
}
