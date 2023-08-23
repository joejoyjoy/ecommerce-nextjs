"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useSelector } from "react-redux";
import { GoTriangleUp } from "react-icons/go";
import { IoLogOutOutline } from "react-icons/io5";
import { HiOutlineChevronRight } from "react-icons/hi";
import Link from "next/link";

export default function AdminModalCard() {
  const { value } = useSelector((store: any) => store.authReducer);
  const [popperOpen, setPopperOpen] = useState(false);
  let popperRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const modal = document.querySelector("#userCard");
    if (!popperOpen) {
      setTimeout(() => {
        if (modal) {
          modal.classList.add("invisible");
        }
      }, 300);
    }
  }, [popperOpen]);

  useEffect(() => {
    const handler = (e: any) => {
      if (popperRef.current != null) {
        if (!popperRef.current.contains(e.target)) {
          setPopperOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center relative" ref={popperRef}>
      <button
        className="w-9 h-9 p-0 rounded-full drop-shadow-md z-50"
        onClick={() => setPopperOpen(!popperOpen)}
      >
        <Image
          src={value.image ? value.image : "/assets/GIF/giphy.gif"}
          alt={value.name}
          width={36}
          height={36}
          className="rounded-full w-9 h-9 object-cover"
        />
      </button>
      <section
        id="userCard"
        className={`absolute top-[54px] right-0 flex flex-col items-end w-[375px] z-40 before:content-[""] before:rotate-45 ${
          popperOpen ? "popper-active" : "popper-inactive"
        }`}
      >
        <div className="w-[calc(375px-2rem)] rounded-xl shadow-3xl text-gray-700 bg-gray-0 overflow-hidden">
          <div className="flex justify-center absolute -top-[12px] right-0 w-8 p-0 m-0 text-gray-0">
            <GoTriangleUp />
          </div>
          <div className="flex items-center gap-3 py-3 px-5 border-b-[1px] transition duration-150">
            <Image
              src={value.image ? value.image : "/assets/GIF/giphy.gif"}
              alt={value.name}
              width={48}
              height={48}
              priority
              className="rounded-full w-11 h-11 object-cover drop-shadow-md"
            />
            <span>
              <p className="text-md">Hey, {value.name}!</p>
              <p className="text-sm font-normal">{value.email}</p>
            </span>
          </div>
          <span className="flex flex-col gap-1 p-2">
            <Link href={"/"} className="flex justify-between items-center p-2 rounded-md cursor-pointer group hover:bg-gray-03 transition duration-150">
              Validate Product Submit
              <HiOutlineChevronRight
                size={20}
                className="group-hover:animate-bounce"
              />
            </Link>
            <Link href={"/"} className="flex justify-between items-center p-2 rounded-md cursor-pointer group hover:bg-gray-03 transition duration-150">
              Back To Shop
              <HiOutlineChevronRight
                size={20}
                className="group-hover:animate-bounce"
              />
            </Link>
            <div
              onClick={() => signOut()}
              className="flex justify-between items-center p-2 rounded-md cursor-pointer group hover:bg-gray-03 transition duration-150"
            >
              <span className="flex gap-1">
                Logout
                <IoLogOutOutline size={23} />
              </span>
              <HiOutlineChevronRight
                size={20}
                className="group-hover:animate-bounce"
              />
            </div>
          </span>
        </div>
      </section>
    </div>
  );
}
