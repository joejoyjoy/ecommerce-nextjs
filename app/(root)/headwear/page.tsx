"use client";

import React from "react";
import { useSelector } from "react-redux";
import HeaderWithLink from "@/components/shared/HeaderWithLink";
import { Empty } from "antd";
import ProductHomeCard from "@/components/shared/ProductHomeCard";
import { randomMap } from "@/utils/randomMap";
import IsLoadingComponent from "@/components/ui/IsLoadingComponent";

export default function HeadWearPage() {
  const { value, isLoading } = useSelector(
    (store: any) => store.productReducer
  );

  if (isLoading) {
    return <IsLoadingComponent />;
  }

  return (
    <main className="responsive">
      <span className="responsive_wrapper flex flex-col px-7 mb-6">
        <HeaderWithLink title={"Back To Home"} route={"/"} />
        {value.length !== 0 ? (
          <section className="grid grid-cols-5 gap-4 mt-2">
            {randomMap(value)?.map((product: any) => {
              return <ProductHomeCard key={product._id} data={product} />;
            })}
          </section>
        ) : (
          <div className="mx-auto my-20">
            <Empty />
          </div>
        )}
      </span>
    </main>
  );
}
