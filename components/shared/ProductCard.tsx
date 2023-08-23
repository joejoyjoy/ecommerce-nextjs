import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { deleteProduct } from "@/redux/features/product.slice";
import { message, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface Arr {
  data: Params;
}

interface Params {
  _id: string;
  SKU: string;
  name: string;
  desc: string;
  price: number;
  image: ImageArr;
}

interface ImageArr {
  public_id: string;
  secure_url: string;
}

export default function ProductCard({ data }: Arr) {
  const { _id, SKU, name, desc, price, image } = data;

  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = (productId: string) => {
    dispatch(deleteProduct({ productId }));
  };

  const confirm = () => {
    message.success("Selected product deleted");
    handleDelete(_id);
  };

  const cancel = () => {};

  return (
    <div className="box-style p-0">
      <span className="block relative w-full p-4">
        <div className="absolute right-4 bg-gray-3 rounded-full">
          <span className="text-xs font-normal py-1 px-2">SKU: {SKU}</span>
        </div>
        <Image
          src={image?.secure_url}
          alt={name}
          className="object-cover w-full"
          width={190}
          height={190}
          priority
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
        <Link
          href={`/admin/edit?product=${_id}`}
          className="flex justify-center items-center w-full p-2 transition hover:text-blue-500 cursor-pointer"
        >
          <EditOutlined />
        </Link>
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined className="flex justify-center items-center w-full p-2 text-red-500 transition hover:text-red-900 cursor-pointer" />
        </Popconfirm>
      </div>
    </div>
  );
}
