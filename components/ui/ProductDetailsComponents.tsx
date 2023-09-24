"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { findUserById } from "@/redux/features/user.slice";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdOutlineAttachMoney, MdVerified } from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";

export function ProductBenefits() {
  return (
    <div className="flex justify-between bg-gray-0 p-5 rounded-2xl">
      <div className="flex items-center gap-3">
        <div className="icon-ship">
          <LiaShippingFastSolid />
        </div>
        <p className="inline font-bold text-sm">Free shipping</p>
      </div>
      <hr className="hr-style" />
      <div className="flex items-center gap-3">
        <div className="icon-price">
          <MdOutlineAttachMoney />
        </div>
        <p className="inline font-bold text-sm">A fair price</p>
      </div>
      <hr className="hr-style" />
      <div className="flex items-center gap-3">
        <div className="icon-secure">
          <RiSecurePaymentLine />
        </div>
        <p className="inline font-bold text-sm">Secure Payment</p>
      </div>
    </div>
  );
}

export function ProductUploader({ userId }: { userId: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const { value, isLoading } = useSelector((store: any) => store.userReducer);

  const findUser = async () => {
    await dispatch(findUserById({ userId }));
  };

  useEffect(() => {
    findUser();
  }, [userId]);

  console.log(value);

  return (
    <div className="flex justify-between bg-gray-0 p-5 rounded-2xl">
      <div className="flex gap-3">
        <Image
          src={
            value.isAdmin
              ? "/assets/IMG/profile-placeholder-160x160.webp"
              : value.image
          }
          alt={
            value.isAdmin
              ? "User profile picture"
              : value.name + " profile picture"
          }
          width={48}
          height={48}
          className="rounded-full w-12 h-12 object-cover drop-shadow-md"
        />
        <div className="flex flex-col">
          <span className="line-clamp-1">
            {value.isAdmin ? (
              <>
                Cap & Hat Shop
                <MdVerified className="inline align-top ml-1 text-slate-2" />
              </>
            ) : (
              <>{value.name}</>
            )}
          </span>
          <span className="text-sm font-normal">Uploader of product</span>
        </div>
      </div>
    </div>
  );
}
