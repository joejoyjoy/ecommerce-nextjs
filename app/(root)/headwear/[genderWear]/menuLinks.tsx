import Link from "next/link";
import React from "react";

export function menuGender() {
  const menuGender = [
    {
      key: "1",
      label: (
        <Link href={`${process.env.NEXT_PUBLIC_SITE_URL}/headwear/mens`}>
          Mens
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link href={`${process.env.NEXT_PUBLIC_SITE_URL}/headwear/womens`}>
          Women's
        </Link>
      ),
    },
  ];
  return menuGender;
}
