"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { ConfigProvider, Select } from "antd";
import ProtectedRoute from "../../protectedRoute";
import Image from "next/image";
import { PiPlus } from "react-icons/pi";
import { DeleteOutlined } from "@ant-design/icons";
import { categoryOptions, colorOptions, genderOptions } from "@/constants";
import { publishProduct } from "@/lib/actions/product.actions";

interface IFormInput {
  name: string;
  desc: string;
  price: number;
  image: any;
  gender: number;
  category: string;
  color: string;
}

export default function AdminUpload() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();
  const { value } = useSelector((store: any) => store.authReducer);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onSubmit = async (data: IFormInput) => {
    const formData = new FormData();

    formData.append("image", data.image[0]);
    data.image = formData;
    
    const res = await publishProduct(value._id, data);
    
    console.log(res);

    // console.log(value._id);

    // console.log(data.image[0]);

    // console.log(data.name);
    // console.log(data.desc);
    // console.log(data.price);
    // console.log(data.gender);
    // console.log(data.category);
    // console.log(data.color);
  };

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

  return (
    <ProtectedRoute>
      <main className="responsive p-4">
        <span className="responsive_wrapper flex flex-col max-w-[740px] mb-6 py-4 px-8 bg-gray-0 rounded-lg">
          <h2 className="text-2xl mb-4">Upload Product</h2>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#a7afb9",
                borderRadius: 7,
                colorBgContainer: "#f9fafb",
                colorTextPlaceholder: "#a7afb9",
              },
            }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <div className="grid grid-cols-[1fr,_auto] gap-8">
                <div className="flex flex-col gap-6">
                  <div>
                    <label htmlFor="product_name" className="label-form">
                      Title
                      <b className="required-input-form">*</b>
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
                      <p className="errorText-form">
                        Alphabetical characters only
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-[repeat(2,_minmax(0,_1fr))] gap-6">
                    <div>
                      <span className="label-form block">
                        Gender Fashion
                        <b className="required-input-form">*</b>
                      </span>
                      <Select
                        showSearch
                        placeholder="Select a gender fashion"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={genderOptions}
                        {...register("gender", {
                          required: true,
                        })}
                        onChange={(value) => {
                          setValue("gender", value);
                        }}
                      />
                    </div>

                    <div>
                      <span className="label-form block">
                        Category
                        <b className="required-input-form">*</b>
                      </span>
                      <Select
                        showSearch
                        placeholder="Select a category"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={categoryOptions}
                        {...register("category", {
                          required: true,
                        })}
                        onChange={(value) => {
                          setValue("category", value);
                        }}
                      />
                    </div>

                    <div>
                      <span className="label-form block">
                        Color
                        <b className="required-input-form">*</b>
                      </span>
                      <Select
                        showSearch
                        placeholder="Select a Color"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={colorOptions}
                        {...register("color", {
                          required: true,
                        })}
                        onChange={(value) => {
                          setValue("color", value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-6 max-w-[128px] mx-auto">
                  <div>
                    <span className="label-form">
                      Upload Picture
                      <b className="required-input-form">*</b>
                    </span>
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
                          <label
                            htmlFor="product_image"
                            className="label-file-form"
                          >
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
                            <p className="errorText-form">
                              Please upload an image
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="product_price" className="label-form">
                      Price
                      <b className="required-input-form">*</b>
                    </label>
                    <div className="flex items-center">
                      <span className="mr-2 text-gray-05">€</span>
                      <input
                        {...register("price", {
                          required: true,
                          maxLength: 4,
                          pattern: /^[0-9]*$/i,
                        })}
                        id="product_price"
                        placeholder="35"
                        className="input-form"
                      />
                    </div>

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
                </div>
              </div>

              <div>
                <label htmlFor="product_desc" className="label-form">
                  Description
                  <b className="required-input-form">*</b>
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

              <div className="flex justify-center mb-3">
                <input
                  type="submit"
                  value="Post Product"
                  className="flex gap-2 px-10 py-2 rounded-xl text-gray-3 text-md bg-slate-2 animated-button focus:ring-slate-1 cursor-pointer"
                />
              </div>
            </form>
          </ConfigProvider>
        </span>
      </main>
    </ProtectedRoute>
  );
}
