import { ReactNode } from "react";
import Link from "next/link";
import { Category } from "@prisma/client";
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
      <h2 className="text-[28px] mt-25 mb-8">Category</h2>
      <div className="flex justify-between">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            id={category.id}
            text={category.name}
            icon={CATEGORY_ICONS[category.name]}
          />
        ))}
      </div>
    </section>
  );
}

function CategoryCard({
  id,
  text,
  icon,
}: {
  id: number;
  text: string;
  icon: ReactNode;
}) {
  return (
    <Link
      href={`/product?category=${id}`}
      className="w-55 h-47.5 bg-base-shark flex flex-col justify-evenly items-center border border-gray-600 rounded-md"
    >
      {icon}
      <h3 className="text-xl">{text}</h3>
    </Link>
  );
}
