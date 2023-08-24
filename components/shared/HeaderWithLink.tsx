import Link from "next/link";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

interface Props {
  title: string;
  route: string;
}

export default function HeaderWithLink({ title, route }: Props) {
  return (
    <section className="pl-3 mt-6">
      <Link
        href={route}
        className={`inline-flex align-middle gap-2 group${
          route === "none" ? " pointer-events-none" : ""
        }`}
      >
        <p className="text-lg font-semibold text-slate-2">{title}</p>
        {route !== "none" && (
          <span className="text-slate-1 transition ease-in-out duration-500 group-hover:translate-x-2">
            <MdKeyboardArrowRight size={27} />
          </span>
        )}
      </Link>
    </section>
  );
}
