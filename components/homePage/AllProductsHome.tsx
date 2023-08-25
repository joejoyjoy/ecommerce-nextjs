"use client";

import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import HeaderWithLink from "../shared/HeaderWithLink";
import { Empty } from "antd";
import ProductHomeCard from "../shared/ProductHomeCard";
import { randomMap } from "@/utils/randomMap";

export default function AllProductsHome() {
  const { value, isLoading } = useSelector(
    (store: any) => store.productReducer
  );

  if (isLoading) {
    return (
      <div className="mx-auto my-20 z-50">
        <Image
          src={"/assets/GIF/pageLoad.gif"}
          alt="Loading animation"
          width={64}
          height={64}
          priority
        />
      </div>
    );
  }

  return (
    <>
      <HeaderWithLink title={"All Products"} route={"/headwear"} />
      {value.length !== 0 ? (
        <section className="grid grid-cols-5 gap-4 px-3 mt-2">
          {randomMap(value)?.map((product: any) => {
            return <ProductHomeCard key={product._id} data={product} />;
          })}
        </section>
      ) : (
        <div className="mx-auto my-20">
          <Empty />
        </div>
      )}
    </>
  );
}
