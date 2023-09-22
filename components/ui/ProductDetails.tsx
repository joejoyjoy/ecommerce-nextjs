import React from "react";
import Image from "next/image";
import { GiRoundStar } from "react-icons/gi";
import { TbSquareRoundedPlus } from "react-icons/tb";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { PiHeartBold } from "react-icons/pi";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdOutlineAttachMoney } from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";

function ProductDetails({ data }: { data: ProductState }) {
  const {
    _id,
    SKU,
    name,
    desc,
    price,
    image,
    gender,
    rating,
    likes,
    category,
    color,
    publisherId,
  } = data;
  const { secure_url, public_id } = image;

  return (
    <section className="grid grid-cols-[2fr,_3fr] gap-6">
      <div className="relative bg-gray-1 rounded-2xl overflow-hidden">
        <Image
          src={secure_url}
          alt={name}
          fill={true}
          className="object-cover"
        />
      </div>
      <div className="bg-gray-0 p-8 rounded-2xl">
        <div className="flex justify-between gap-2">
          <p className="text-2xl font-bold">{name}</p>
          <div className="flex flex-col h-8">
            <span className="text-yellow">
              <GiRoundStar size={16} />
            </span>
            <span className="text-xs font-normal text-center">{rating}</span>
          </div>
        </div>
        <p className="text-sm font-semibold text-slate-2 mt-2">{desc}</p>
        <p className="capitalize mt-7">Color: {color}</p>
        <p className="font-bold mt-7">ONE SIZE, FITS MOST</p>
        <p className="text-2xl font-bold mt-7">€59.00</p>
        <div className="flex gap-6 mt-7">
          <div className="flex items-center gap-3 px-2 py-4 bg-gray-0 rounded-2xl text-sm text-gray-05">
            <button>
              <AiOutlineMinus size={18} />
            </button>
            <span className="text-gray-5">2</span>
            <button>
              <AiOutlinePlus size={18} />
            </button>
          </div>
          <button className="flex items-center gap-3 px-6 py-4 rounded-2xl text-gray-3 text-sm font-semibold uppercase bg-slate-2 animated-button focus:ring-slate-1">
            <TbSquareRoundedPlus size={23} />
            Add to basket
          </button>
          <button className="flex items-center gap-3 px-4 py-4 bg-gray-0 rounded-2xl text-sm text-gray-05 animated-button focus:ring-gray-3">
            <PiHeartBold size={23} />
          </button>
        </div>
      </div>
      <div className="flex justify-between bg-gray-0 p-5 rounded-2xl">
        <button className="w-9 h-9 p-0 rounded-full drop-shadow-md z-50">
          <Image
            src={"/assets/IMG/profile-placeholder-160x160.webp"}
            alt={"User profile picture"}
            width={36}
            height={36}
            className="rounded-full w-9 h-9 object-cover"
          />
        </button>
      </div>
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
    </section>
  );
}

export default ProductDetails;
