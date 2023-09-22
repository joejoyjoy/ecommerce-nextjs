"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Breadcrumb, Result, Button } from "antd";
import IsLoadingComponent from "@/components/ui/IsLoadingComponent";
import { menuCategory } from "../menuLinks";
import { menuGender } from "../../menuLinks";
import { findProductById } from "@/lib/actions/product.actions";
import {
  getLabelOfCategory,
  getLabelOfGender,
} from "@/utils/getLabelFromValue";
import { BsBoxSeam } from "react-icons/bs";
import ProductDetails from "@/components/ui/ProductDetails";

interface pageProps {
  params: { productId: string };
}

export default function CategoryWearPage({ params }: pageProps) {
  const [paramsExist, setParamsExist] = useState(false);
  const [doneLoading, setDoneLoading] = useState(false);
  const { isLoading } = useSelector((store: any) => store.productReducer);
  const [productData, setProductData] = useState<ProductState>({
    _id: "",
    SKU: "",
    name: "",
    desc: "",
    price: 0,
    image: {
      public_id: "",
      secure_url: "",
    },
    gender: 0,
    rating: 0,
    likes: 0,
    category: "",
    color: "",
    publisherId: "",
    createdAt: 0,
    updatedAt: 0,
    __v: 0,
  });
  const { gender, category } = productData;

  useEffect(() => {
    async function findProductOfParams(productId: string) {
      const result = await findProductById(productId);
      if (result === "REDIRECT") {
        return setDoneLoading(true);
      }
      setProductData(result);
      setParamsExist(true);
      setDoneLoading(true);
    }
    findProductOfParams(params.productId);
  }, [isLoading]);

  if (isLoading) {
    return <IsLoadingComponent />;
  }

  if (doneLoading && !paramsExist) {
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
                    href={`/headwear/${getLabelOfGender(gender)}`}
                    className="capitalize"
                  >
                    {getLabelOfGender(gender)}
                  </Link>
                ),
                menu: { items: menuGender() },
              },
              {
                title: (
                  <Link
                    href={`/headwear/${getLabelOfGender(
                      gender
                    )}/${getLabelOfCategory(category)}`}
                    className="capitalize"
                  >
                    {getLabelOfCategory(category)}
                  </Link>
                ),
                menu: { items: menuCategory({ categoryGender: gender }) },
              },
              {
                title: (
                  <div className="flex items-center h-full">
                    <BsBoxSeam />
                  </div>
                ),
              },
            ]}
          />
        </div>
        <ProductDetails data={productData} />
      </span>
    </main>
  );
}
