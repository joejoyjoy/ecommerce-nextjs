import React from "react";
import Image from "next/image";
import Link from "next/link";
import HeaderWithLink from "../shared/HeaderWithLink";

export default function CategoryHome() {
  return (
    <>
      <HeaderWithLink title={"All our categories"} route={"/"} />
      <section className="grid grid-cols-4">
        <div className="flex col-start-1 col-span-1 aspect-square">
          <Link href={"/"} className="box-style category-cards group">
            <Image
              src={"/assets/IMG/toque-hat-category.jpg"}
              alt="Man in snow with toque hat"
              fill={true}
              className="category-cards_image group-hover:translate-x-[calc(100%+2.5rem)] group-hover:scale-125"
            />
            <Image
              src={"/assets/IMG/toque-hat-category.jpg"}
              alt="Man in snow with toque hat"
              fill={true}
              className="category-cards_image scale-125 z-0"
            />
            <div className="box-style category-cards absolute aspect-square bg-gray-0 bg-opacity-60 z-0" />
            <span className="category-cards_text -translate-x-12  group-hover:translate-x-0 group-hover:scale-100">
              Category: <h2 className="font-black">Men's Toque Hats</h2>
            </span>
            <p className="category-cards_title group-hover:translate-x-[calc(100%+8rem)] group-hover:scale-125">
              Toque Hats
            </p>
          </Link>
        </div>
        <div className="flex col-start-2 col-span-2 aspect-[2/1]">
          <Link href={"/"} className="box-style category-cards group">
            <Image
              src={"/assets/IMG/flat-cap-category.jpg"}
              alt="Hello"
              fill={true}
              className="category-cards_image object-right-top group-hover:-translate-y-[calc(100%+2.5rem)] group-hover:scale-125"
            />
            <Image
              src={"/assets/IMG/flat-cap-category.jpg"}
              alt="Hello"
              fill={true}
              className="category-cards_image scale-125 z-0"
            />
            <div className="box-style category-cards absolute aspect-square bg-gray-0 bg-opacity-60 z-0" />
            <span className="category-cards_text translate-y-12 group-hover:translate-y-0 group-hover:scale-100">
              Category: <h2 className="font-black">Men's Flat Caps</h2>
            </span>
            <p className="category-cards_title group-hover:-translate-y-[calc(100%+8rem)] group-hover:scale-125">
              Flat Caps
            </p>
          </Link>
        </div>
        <div className="flex row-span-2 aspect-[1/2]">
          <Link href={"/"} className="box-style category-cards group">
            <Image
              src={"/assets/IMG/baseball-cap-category.jpg"}
              alt="Hello"
              fill={true}
              className="category-cards_image group-hover:-translate-x-[calc(100%+4.5rem)] group-hover:scale-125"
            />
            <Image
              src={"/assets/IMG/baseball-cap-category.jpg"}
              alt="Hello"
              fill={true}
              className="category-cards_image scale-125 z-0"
            />
            <div className="box-style category-cards absolute w-full h-full bg-gray-0 bg-opacity-60 z-0" />
            <span className="category-cards_text translate-x-12 group-hover:translate-x-0 group-hover:scale-100">
              Category: <h2 className="font-black">Men's Baseball Cap</h2>
            </span>
            <p className="category-cards_title group-hover:-translate-x-[calc(100%+16rem)] group-hover:scale-125">
              Baseball Cap
            </p>
          </Link>
        </div>
        <div className="flex col-start-1 col-span-2 aspect-[2/1]">
          <Link href={"/"} className="box-style category-cards group">
            <Image
              src={"/assets/IMG/hat-category.jpg"}
              alt="Hello"
              fill={true}
              className="category-cards_image group-hover:-translate-y-[calc(100%+2.5rem)] group-hover:scale-125"
            />
            <Image
              src={"/assets/IMG/hat-category.jpg"}
              alt="Hello"
              fill={true}
              className="category-cards_image scale-125 z-0"
            />
            <div className="box-style category-cards absolute aspect-square bg-gray-0 bg-opacity-60 z-0" />
            <span className="category-cards_text translate-y-12 group-hover:translate-y-0 group-hover:scale-100">
              Category: <h2 className="font-black">Woman's Hats</h2>
            </span>
            <p className="category-cards_title group-hover:-translate-y-[calc(100%+8rem)] group-hover:scale-125">
              Summer Hats
            </p>
          </Link>
        </div>
        <div className="flex col-span-1 col-start-3 aspect-square">
          <Link href={"/"} className="box-style category-cards group">
            <Image
              src={"/assets/IMG/beret-category.jpg"}
              alt="Hello"
              fill={true}
              className="category-cards_image group-hover:-translate-y-[calc(100%+2.5rem)] group-hover:scale-125"
            />
            <Image
              src={"/assets/IMG/beret-category.jpg"}
              alt="Hello"
              fill={true}
              className="category-cards_image scale-125 z-0"
            />
            <div className="box-style category-cards absolute aspect-square bg-gray-0 bg-opacity-60 z-0" />
            <span className="category-cards_text translate-y-12 group-hover:translate-x-0 group-hover:scale-100">
              Category: <h2 className="font-black">Woman's Beret</h2>
            </span>
            <p className="category-cards_title group-hover:-translate-y-[calc(100%+8rem)] group-hover:scale-125">
              Beret Hats
            </p>
          </Link>
        </div>
      </section>
    </>
  );
}
