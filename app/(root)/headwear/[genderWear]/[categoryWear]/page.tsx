"use client";

import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
import HeaderWithLink from "@/components/shared/HeaderWithLink";
import { Empty } from "antd";
import ProductHomeCard from "@/components/shared/ProductHomeCard";
import { randomMap } from "@/utils/randomMap";
import IsLoadingComponent from "@/components/ui/IsLoadingComponent";
import { categoryOptions } from "@/constants";

interface pageProps {
  params: { categoryWear: string };
}

export default function CategoryWearPage({ params }: pageProps) {
  const [categoryId, setCategoryId] = useState("");
  const [paramsExist, setParamsExist] = useState(false);
  const { value, isLoading } = useSelector(
    (store: any) => store.productReducer
  );

  useEffect(() => {
    const onParams = () => {
      categoryOptions.map((option: any) => {
        if (option.label == params.categoryWear) {
          setParamsExist(true);
          setCategoryId(option.value);
        }
      });
    };
    onParams();
  }, [paramsExist]);

  console.log(categoryId);

  if (isLoading) {
    return <IsLoadingComponent />;
  }

  if (paramsExist) {
    return (
      <main className="responsive">
        <span className="responsive_wrapper flex flex-col px-7 mb-6">
          <HeaderWithLink title={"Back To All Head Wear"} route={"/headware"} />
          {value.length !== 0 && value[0].image.secure_url != "" ? (
            <section className="grid grid-cols-5 gap-4 mt-2">
              {randomMap(value)?.map((product: any) => {
                if (product.category == categoryId) {
                  return <ProductHomeCard key={product._id} data={product} />;
                }
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

  return <h1>Nothing found on: {params.categoryWear}</h1>;

  // return redirect("/headwear");
}
