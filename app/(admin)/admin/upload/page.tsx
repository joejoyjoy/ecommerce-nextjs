"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ProtectedRoute from "../../protectedRoute";
import Image from "next/image";
import { PiPlus } from "react-icons/pi";
import { DeleteOutlined } from "@ant-design/icons";

interface IFormInput {
  name: string;
  desc: string;
  price: number;
  image: string;
}

export default function AdminUpload() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onSubmit = (data: IFormInput) => {
    console.log(data);
    alert(JSON.stringify(data));
  }; // your form submit function which will invoke after successful validation

  const handleFileDelete = () => {
    setImagePreview("");
    reset({ image: "" });
  };

  useEffect(() => {
    const handleImage = () => {
      const fileReader = new FileReader();

      if (watch("image") && watch("image").length > 0) {
        const file = watch("image")[0] as unknown as File;

        if (!file.type.includes("image")) return;

        fileReader.onload = async (event) => {
          const imageDataUrl = event.target?.result?.toString() || "";
          setImagePreview(imageDataUrl);
        };

        fileReader.readAsDataURL(file);
      }
    };
    handleImage();
  }, [watch("image")]);

  console.log(imagePreview);

  return (
    <ProtectedRoute>
      <main className="responsive p-4">
        <span className="responsive_wrapper flex flex-col max-w-[720px] mb-6 p-4 bg-gray-0 rounded-lg">
          <h2 className="text-2xl mb-4">Upload Product</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div>
              <label htmlFor="product_name" className="label-form">
                Title
              </label>
              <input
                {...register("name", {
                  required: true,
                  maxLength: 50,
                  pattern: /^[A-Za-z0-9\s,.%|·]*$/i,
                })}
                id="product_name"
                placeholder="LA Dodgers League Essential"
                className="input-form"
              />
              {errors?.name?.type === "required" && (
                <p className="errorText-form">This field is required</p>
              )}
              {errors?.name?.type === "maxLength" && (
                <p className="errorText-form">
                  Product title cannot exceed 50 characters
                </p>
              )}
              {errors?.name?.type === "pattern" && (
                <p className="errorText-form">Alphabetical characters only</p>
              )}
            </div>

            <div>
              <label htmlFor="product_desc" className="label-form">
                Description
              </label>
              <textarea
                {...register("desc", {
                  required: true,
                  maxLength: 750,
                  pattern: /^[A-Za-z0-9\s,.%|·]+$/i,
                })}
                id="product_desc"
                placeholder="Structured crown, Snapback, Curved visor, Mesh back and..."
                className="input-form max-h-52"
                rows={3}
              />
              {errors?.desc?.type === "required" && (
                <p className="errorText-form">This field is required</p>
              )}
              {errors?.desc?.type === "maxLength" && (
                <p className="errorText-form">
                  First name cannot exceed 750 characters
                </p>
              )}
              {errors?.desc?.type === "pattern" && (
                <p className="errorText-form">Alphabetical characters only</p>
              )}
            </div>

            <div>
              <label htmlFor="product_price" className="label-form">
                Price
              </label>
              <input
                {...register("price", {
                  required: true,
                  maxLength: 4,
                  pattern: /^[0-9]*$/i,
                })}
                id="product_price"
                placeholder="€35"
                className="input-form"
              />
              {errors?.price?.type === "required" && (
                <p className="errorText-form">This field is required</p>
              )}
              {errors?.price?.type === "maxLength" && (
                <p className="errorText-form">
                  Product price cannot exceed 9.999€
                </p>
              )}
              {errors?.price?.type === "pattern" && (
                <p className="errorText-form">Numeric characters only</p>
              )}
            </div>

            <div>
              <span className="label-form">Upload Picture</span>
              <div>
                {imagePreview ? (
                  <div
                    onClick={handleFileDelete}
                    className="relative label-file-form group overflow-hidden"
                  >
                    <Image
                      src={imagePreview}
                      alt="profile icon"
                      width={105}
                      height={105}
                      priority
                      className="block w-[105px] h-[105px] m-[11.5px] object-cover rounded-sm"
                    />
                    <div className="label-file-preview-form group-hover:opacity-100 group-hover:bg-black group-hover:bg-opacity-40">
                      <DeleteOutlined />
                    </div>
                  </div>
                ) : (
                  <>
                    <label htmlFor="product_image" className="label-file-form">
                      <PiPlus size={23} />
                      Upload
                    </label>
                    <input
                      {...register("image", {
                        required: true,
                      })}
                      type="file"
                      id="product_image"
                      accept="image/*"
                      placeholder="Add profile photo"
                      className="hidden"
                    />
                    {errors?.image?.type === "required" && (
                      <p className="errorText-form">Please upload an image</p>
                    )}
                  </>
                )}
              </div>
            </div>

            <input type="submit" />
          </form>
        </span>
      </main>
    </ProtectedRoute>
  );
}
