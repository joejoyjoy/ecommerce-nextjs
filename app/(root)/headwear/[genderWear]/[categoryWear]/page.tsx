"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Empty, Breadcrumb, Result, Button } from "antd";
import ProductHomeCard from "@/components/shared/ProductHomeCard";
import { randomMap } from "@/utils/randomMap";
import { formatUriLabel } from "@/utils/formatUriLabel";
import { findGenderByCategory } from "@/utils/findGenderByCategory";
import IsLoadingComponent from "@/components/ui/IsLoadingComponent";
import { categoryOptions, genderOptions } from "@/constants";
import { menuCategory } from "./menuLinks";
import { menuGender } from "../menuLinks";

interface pageProps {
  params: { categoryWear: string };
}

export default function CategoryWearPage({ params }: pageProps) {
  const [categoryId, setCategoryId] = useState("");
  const [paramsExist, setParamsExist] = useState(false);
  const [categoryGender, setCategoryGender] = useState<string | null>("");
  const { value, isLoading } = useSelector(
    (store: any) => store.productReducer
  );

  useEffect(() => {
    const onParams = () => {
      categoryOptions.map((option: any) => {
        if (option.label == params.categoryWear) {
          setParamsExist(true);
          setCategoryId(option.value);
          const res = findGenderByCategory(genderOptions, categoryId);
          setCategoryGender(res);
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
                      href={`/headwear/${categoryGender}`}
                      className="capitalize"
                    >
                      {formatUriLabel(
                        categoryGender != null ? categoryGender : ""
                      )}
                    </Link>
                  ),
                  menu: { items: menuGender() },
                },
                {
                  title: (
                    <Link
                      href={`/headwear/${categoryGender}/${params.categoryWear}`}
                      className="capitalize"
                    >
                      {formatUriLabel(
                        params != null ? params.categoryWear : ""
                      )}
                    </Link>
                  ),
                  menu: { items: menuCategory({ categoryGender }) },
                },
              ]}
            />
          </div>
          {value.length !== 0 ? (
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
