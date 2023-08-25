import Link from "next/link";
import React from "react";

export function menuCategory({
  categoryGender,
}: {
  categoryGender: string | number | null;
}) {
  const menuCategoryWomens = [
    {
      key: "1",
      label: (
        <Link
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/headwear/womens/summer-hats`}
        >
          Summer Hats
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/headwear/womens/beret-hats`}
        >
          Beret Hats
        </Link>
      ),
    },
  ];
  const menuCategoryMens = [
    {
      key: "1",
      label: (
        <Link
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/headwear/mens/toque-hats`}
        >
          Toque Hats
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/headwear/mens/flat-caps`}
        >
          Flat Caps
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/headwear/mens/baseball-caps`}
        >
          Baseball Caps
        </Link>
      ),
    },
  ];

  if (categoryGender === "mens" || categoryGender === 1) {
    return menuCategoryMens;
  }
  return menuCategoryWomens;
}
