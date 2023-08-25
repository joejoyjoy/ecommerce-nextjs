"use client";

import React from "react";
import { useSelector } from "react-redux";
import ProtectedRoute from "../protectedRoute";
import { Empty } from "antd";
import ProductAdminCard from "@/components/shared/ProductAdminCard";

export default function Admin() {
  const { value } = useSelector((store: any) => store.productReducer);

  return (
    <ProtectedRoute>
      <main className="responsive">
        <span className="responsive_wrapper flex items-center justify-between py-3 mb-6">
          {value.length !== 0 ? (
            <div className="grid grid-cols-[repeat(5,_minmax(0,_1fr))] gap-4">
              {value?.map((product: any) => {
                return <ProductAdminCard key={product._id} data={product} />;
              })}
            </div>
          ) : (
            <div className="mx-auto my-20">
              <Empty />
            </div>
          )}
        </span>
      </main>
    </ProtectedRoute>
  );
}
