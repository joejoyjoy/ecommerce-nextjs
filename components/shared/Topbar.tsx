import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineChevronDown } from "react-icons/hi";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { RiSearch2Line } from "react-icons/ri";
import { CiShoppingCart } from "react-icons/ci";
import { PiHeartLight } from "react-icons/pi";

export default function Topbar() {
  return (
    <nav className="responsive bg-gray-2 z-30">
      <span className="responsive_wrapper flex items-center justify-between py-3">
        <section className="flex gap-12">
          <Link href="/" className="text-xl text-slate-2">
            <b>Cap&Hat</b>Shop
          </Link>
          <div className="flex items-center gap-3">
            <HiOutlineSquares2X2 size={23} className="text-slate-1" />
            <span className="flex items-center gap-2">
              Collections
              <HiOutlineChevronDown size={12} className="text-slate-1" />
            </span>
          </div>
          <div className="flex gap-4">
            <Link href="/">Sizing</Link>
            <Link href="/">Scale</Link>
            <Link href="/">About Us</Link>
          </div>
        </section>
        <section className="flex gap-12">
          <span className="relative">
            <input
              id="search"
              type="text"
              placeholder="Search In Shop..."
              className="search-bar"
            />
            <label
              htmlFor="search"
              className="absolute right-0.5 top-0.5 p-2 rounded-xl bg-slate-2"
            >
              <RiSearch2Line size={20} className="text-gray-0" />
            </label>
          </span>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2">
              <CiShoppingCart size={25} />
              <PiHeartLight size={20} />
            </span>
            <span className="relative">
              <Image
                src={"/assets/IMG/avatar.jpg"}
                alt="Hello"
                width={50}
                height={50}
                className="rounded-full w-9 h-9 object-cover"
              />
            </span>
          </div>
        </section>
      </span>
    </nav>
  );
}
