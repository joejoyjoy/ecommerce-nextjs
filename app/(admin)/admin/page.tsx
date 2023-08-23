"use client";

import React from "react";
import { useSelector } from "react-redux";
import ProtectedRoute from "../protectedRoute";
import ProductCard from "@/components/shared/ProductCard";

export default function Admin() {
  const { value } = useSelector((store: any) => store.productReducer);

  return (
      <ProtectedRoute>
        <main className="responsive">
          <span className="responsive_wrapper flex items-center justify-between py-3 mb-6">
            <div className="grid grid-cols-[repeat(5,_minmax(0,_1fr))] gap-4">
              {value[0]?.image.secure_url != "" &&
                value.map((product: any) => {
                  return <ProductCard key={product.SKU} data={product} />;
                })}
            </div>
          </span>
        </main>
      </ProtectedRoute>
  );
}
