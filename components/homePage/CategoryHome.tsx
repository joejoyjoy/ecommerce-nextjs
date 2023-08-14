import React from "react";
import Image from "next/image";

export default function CategoryHome() {
  return (
    <section className="grid grid-cols-4">
      <div className="flex col-start-1 col-span-1 aspect-square">
        <span className="box-style relative m-2 w-full">
          <Image
            src={"/assets/IMG/toque-hat-category.jpg"}
            alt="Hello"
            fill={true}
            className="object-cover"
          />
        </span>
      </div>
      <div className="flex col-start-2 col-span-2 aspect-[2/1]">
        <span className="box-style relative m-2 w-full">
          <Image
            src={"/assets/IMG/flat-cap-category.jpg"}
            alt="Hello"
            fill={true}
            className="object-cover object-right-top"
          />
        </span>
      </div>
      <div className="flex row-span-2 aspect-[1/2]">
        <span className="box-style relative m-2 w-full">
          <Image
            src={"/assets/IMG/baseball-cap-category.jpg"}
            alt="Hello"
            fill={true}
            className="object-cover"
          />
        </span>
      </div>
      <div className="flex col-start-1 col-span-2 aspect-[2/1]">
        <span className="box-style relative m-2 w-full">
          <Image
            src={"/assets/IMG/hat-category.jpg"}
            alt="Hello"
            fill={true}
            className="object-cover"
          />
        </span>
      </div>
      <div className="flex col-span-1 col-start-3 aspect-square">
        <span className="box-style relative m-2 w-full">
          <Image
            src={"/assets/IMG/beret-category.jpg"}
            alt="Hello"
            fill={true}
            className="object-cover"
          />
        </span>
      </div>
    </section>
  );
}
