"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Empty, Button, Result, Breadcrumb } from "antd";
import ProductHomeCard from "@/components/shared/ProductHomeCard";
import { randomMap } from "@/utils/randomMap";
import IsLoadingComponent from "@/components/ui/IsLoadingComponent";
import { genderOptions } from "@/constants";
import { menuGender } from "./menuLinks";
import { formatUriLabel } from "@/utils/formatUriLabel";

interface pageProps {
  params: { genderWear: string };
}

export default function GenderWearPage({ params }: pageProps) {
  const [genderId, setGenderId] = useState("");
  const [paramsExist, setParamsExist] = useState(false);
  const { value, isLoading } = useSelector(
    (store: any) => store.productReducer
  );

  useEffect(() => {
    const onParams = () => {
      genderOptions.map((option: any) => {
        if (option.label == params.genderWear) {
          setParamsExist(true);
          setGenderId(option.value);
        }
      });
    };
    onParams();
  }, [paramsExist]);

  if (isLoading) {
    return <IsLoadingComponent />;
  }

  if (paramsExist) {
    return (
      <main className="responsive">
        <span className="responsive_wrapper flex flex-col px-7 mb-6">
          <div className="mt-3 mb-1">
            <Breadcrumb
              items={[
                {
                  title: <Link href="/">Home</Link>,
                },
                {
                  title: <Link href="/headwear">Head Wear</Link>,
                },
                {
                  title: (
                    <Link
                      href={`/headwear/${params.genderWear}`}
                      className="capitalize"
                    >
                      {formatUriLabel(params != null ? params.genderWear : "")}
                    </Link>
                  ),
                  menu: { items: menuGender() },
                },
              ]}
            />
          </div>
          {value.length !== 0 ? (
            <section className="grid grid-cols-5 gap-4 mt-2">
              {randomMap(value)?.map((product: any) => {
                if (product.gender == genderId) {
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

  return (
    <main className="responsive">
      <span className="responsive_wrapper flex flex-col justify-center px-7 mb-6">
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button type="primary" href="/headware">
              Back To All categories
            </Button>
          }
        />
      </span>
    </main>
  );
}
