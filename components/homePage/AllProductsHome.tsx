import React from "react";
import Image from "next/image";
import HeaderWithLink from "../shared/HeaderWithLink";
import { products } from "@/constants/index";
import { CiShoppingCart } from "react-icons/ci";
import { PiHeartLight } from "react-icons/pi";
import { GiRoundStar } from "react-icons/gi";

export default function AllProductsHome() {
  return (
    <>
      <HeaderWithLink title={"All Products"} route={"/all-products"} />
      <section className="grid grid-cols-5 gap-4 px-3 mt-2">
        {products.map((product) => {
          const { SKU, name, desc, price, gender, color, rating, hex, images } =
            product;

          return (
            <div key={SKU} className="box-style">
              <span className="block relative w-full">
                <div className="absolute flex items-center gap-2 h-8">
                  <CiShoppingCart size={24} />
                  <PiHeartLight size={20} />
                </div>
                <div className="absolute right-0 flex flex-col h-8">
                  <span className="text-yellow">
                    <GiRoundStar size={16} />
                  </span>
                  <span className="text-xs font-normal">4.5</span>
                </div>
                <Image
                  src={images + "-left.jpg"}
                  alt={name}
                  className="object-cover w-full"
                  width={190}
                  height={190}
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
                      style={{ backgroundColor: hex }}
                      className="block w-3 h-3 ml-3 rounded-full z-10"
                    />
                  </span>
                </div>
              </span>
            </div>
          );
        })}
      </section>
    </>
  );
}
