"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { findAllProducts } from "@/redux/features/product.slice";

export default function ProductState({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } = useSelector((store: any) => store.authReducer);
  const { value } = useSelector((store: any) => store.productReducer);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const allProducts = async () => {
      const res = await dispatch(findAllProducts());
      return res;
    };
    if (!isLoading) {
      allProducts();
    }
  }, [isLoading, value.length]);

  return children;
}
