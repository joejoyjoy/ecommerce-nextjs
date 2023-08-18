import Image from "next/image";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface Arr {
  data: Params;
}

interface Params {
  SKU: string;
  name: string;
  desc: string;
  price: number;
  gender: number;
  color: string;
  rating: number;
  hex: string;
  images: string;
}

export default function ProductCard({ data }: Arr) {
  const { SKU, name, desc, price, images } = data;

  return (
    <div className="box-style p-0">
      <span className="block relative w-full p-4">
        <div className="absolute right-4 bg-gray-3 rounded-full">
          <span className="text-xs font-normal py-1 px-2">SKU: {SKU}</span>
        </div>
        <Image
          src={images + "-left.jpg"}
          alt={name}
          className="object-cover w-full"
          width={190}
          height={190}
        />
        <div className="absolute bottom-0 h-8">
          <p className="font-bold">€{Number(price).toFixed(2)}</p>
        </div>
      </span>
      <div className="px-4">
        <div className="text-sm font-semibold my-1 tracking-tight truncate">
          {name}
        </div>
        <div className="text-sm font-normal my-1 line-clamp-3">{desc}</div>
      </div>
      <div className="flex justify-around divide-x mt-3 py-2 border-t text-gray-4">
        <EditOutlined className="w-full p-2 transition hover:text-blue-500 cursor-pointer" />
        <DeleteOutlined className="w-full p-2 text-red-500 transition hover:text-red-900 cursor-pointer" />
      </div>
    </div>
  );
}
