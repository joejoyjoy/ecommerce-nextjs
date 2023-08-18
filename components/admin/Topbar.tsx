"use client";

import React from "react";
import Link from "next/link";
import { TbSquareRoundedPlus } from "react-icons/tb";
import AdminModalCard from "./AdminModalCard";
import { activeLink } from "@/utils/activeLink";
import { usePathname  } from "next/navigation";
import { adminNavLinks } from "@/constants";

export default function Topbar() {
  const currentPath = usePathname();

  return (
    <nav className="responsive bg-gray-2 z-30">
      <span className="responsive_wrapper flex items-center justify-between py-3">
        <section className="flex items-center gap-5">
          <Link href="/admin" className="text-xl text-slate-2">
            <b>Cap&Hat</b>Admin
          </Link>
        </section>
        <section className="flex items-center gap-5">
          {adminNavLinks.map((navLink, index) => {
            const { name, link } = navLink;
            return (
              <Link
                key={index}
                href={link}
                className={`${activeLink(link, currentPath)}`}
              >
                {name}
              </Link>
            );
          })}
        </section>
        <section className="flex items-center gap-5">
          <Link
            href="/admin/upload"
            className="flex gap-2 px-4 py-2 rounded-xl text-gray-3 text-md bg-slate-2 animated-button focus:ring-slate-1"
          >
            <TbSquareRoundedPlus size={23} />
            Upload Product
          </Link>
          <div className="flex items-center">
            <AdminModalCard />
          </div>
        </section>
      </span>
    </nav>
  );
}
