import Image from "next/image";
import { CiShoppingCart } from "react-icons/ci";
import { PiHeartLight } from "react-icons/pi";
import { GiRoundStar } from "react-icons/gi";
import Link from "next/link";
import { categoryOptions, genderOptions } from "@/constants";
import { useEffect, useState } from "react";

interface Arr {
  data: ProductState;
}

export default function ProductHomeCard({ data }: Arr) {
  const { _id, name, price, image, gender, category, color, rating } = data;
  const [genderName, setGenderName] = useState("");
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    genderOptions.map((option: any) => {
      if (option.value == gender) {
        setGenderName(option.label);
      }
    });
    categoryOptions.map((option: any) => {
      if (option.value == category) {
        setCategoryName(option.label);
      }
    });
  }, []);

  return (
    <Link
      href={`/headwear/${genderName}/${categoryName}/${_id}`}
      className="box-style group"
    >
      <span className="block relative w-full overflow-hidden">
        <div className="absolute flex items-center gap-2 h-8 z-[1]">
          <CiShoppingCart size={24} />
          <PiHeartLight size={20} />
        </div>
        <div className="absolute right-0 flex flex-col h-8 z-[1]">
          <span className="text-yellow">
            <GiRoundStar size={16} />
          </span>
          <span className="text-xs font-normal text-center">{rating}</span>
        </div>
        <Image
          src={image.secure_url}
          alt={name}
          className="category-cards_image w-full group-hover:scale-[1.15]"
          width={190}
          height={190}
          priority
        />
      </span>
      <span>
        <span className="block text-xs font-normal text-gray-4">
          {gender ? "Men's " : "Womans "}Fashion
        </span>
        <span className="block text-sm font-semibold my-1 tracking-tight truncate">
          {name}
        </span>
        <div className="flex justify-between items-center mt-5">
          <p className="font-bold">€{Number(price).toFixed(2)}</p>
          <span className="flex items-center h-6 p-3 text-gray-4 font-normal text-sm bg-gray-0 rounded-full">
            Color:
            <span
              style={{ backgroundColor: color }}
              className={`block w-3 h-3 ml-3 rounded-full z-10 ${
                color == "white" || color == "yellow" || color == "beige"
                  ? "border-[1px]"
                  : ""
              }`}
            />
          </span>
        </div>
      </span>
    </Link>
  );
}
