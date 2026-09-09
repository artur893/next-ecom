import { ReactNode } from "react";
import MouseIcon from "../icons/MouseIcon";
import MonitorIcon from "../icons/MonitorIcon";
import HeadphoneIcon from "../icons/HeadphoneIcon";
import KeyboardIcon from "../icons/KeyboardIcon";
import WebcamIcon from "../icons/WebcamIcon";

export default function CategorySection() {
  return (
    <section>
      <h2 className="text-[28px] mt-25 mb-8">Category</h2>
      <div className="flex justify-between">
        <CategoryCard text="Mouse" icon={<MouseIcon />} />
        <CategoryCard text="Monitor" icon={<MonitorIcon />} />
        <CategoryCard text="Headphone" icon={<HeadphoneIcon />} />
        <CategoryCard text="Keyboard" icon={<KeyboardIcon />} />
        <CategoryCard text="Webcam" icon={<WebcamIcon />} />
      </div>
    </section>
  );
}

function CategoryCard({ text, icon }: { text: string; icon: ReactNode }) {
  return (
    <button className="w-55 h-47.5 bg-base-white flex flex-col justify-evenly items-center border border-gray-600 rounded-md">
      {icon}
      <h3 className="text-xl">{text}</h3>
    </button>
  );
}
