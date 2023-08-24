import React from "react";
import Image from "next/image";

export default function IsLoadingComponent() {
  return (
    <div className="flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 h-screen w-screen bg-inherit z-50">
      <Image
        src={"/assets/GIF/pageLoad.gif"}
        alt="Loading animation"
        width={64}
        height={64}
        priority
      />
    </div>
  );
}
