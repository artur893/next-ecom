import { ReactNode } from "react";
import { Category } from "@prisma/client";
import { Card } from "@/app/components/ui";
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

export default function CategorySection({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <section>
      <h2 className="text-heading-4 font-medium mt-25 mb-8">Category</h2>
      <div className="flex justify-between">
        {categories.map((category) => (
          <Card
            key={category.id}
            href={`/product?category=${category.id}`}
            icon={CATEGORY_ICONS[category.name]}
            label={category.name}
            className="w-55 h-47.5"
          />
        ))}
      </div>
    </section>
  );
}
