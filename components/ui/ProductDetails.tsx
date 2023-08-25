import React from "react";
import Image from "next/image";

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
  } = data;
  const { secure_url, public_id } = image;

  return (
    <div>
      <Image src={secure_url} alt={name} width={200} height={200} />
      <p className="text-xl">{name}</p>
      <p>{desc}</p>
    </div>
  );
}

export default ProductDetails;
