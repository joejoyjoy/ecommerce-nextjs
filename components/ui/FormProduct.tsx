"use client";

import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Select, Cascader, message, notification } from "antd";
import Image from "next/image";
import { PiPlus } from "react-icons/pi";
import { DeleteOutlined } from "@ant-design/icons";
import { colorOptions, optionsCascader } from "@/constants";
import IsLoadingComponent from "./IsLoadingComponent";

export default function FormProduct({
  purpose,
  dataProduct,
  onSubmit,
}: {
  purpose: string;
  dataProduct?: ProductState;
  onSubmit: SubmitHandler<IFormInput>;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();
  const [api, contextHolder] = notification.useNotification();
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleFileDelete = () => {
    setImagePreview("");
    reset({ image: "" });
    message.error("Successfully deleted the uploaded image");
  };

  const onChangeCascader = (value: any) => {
    if (value) {
      if (value[0] || value[1]) {
        setValue("gender", value[0]);
        setValue("category", value[1]);
      }
    }
  };

  // Just show the latest item.
  const displayRender = (labels: string[]) => labels[labels.length - 1];

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
    if (purpose == "upload") {
      handleImage();
    }
  }, [watch("image")]);

  useEffect(() => {
    if (purpose != "upload" && dataProduct) {
      setValue("gender", dataProduct.gender);
      setValue("category", dataProduct.category);
      setValue("color", dataProduct.color);

      setValue("image", dataProduct.image.secure_url);
      setImagePreview(dataProduct.image.secure_url);
    }
  }, [purpose, dataProduct]);

  const onInvalid = (errors: any) => {
    const { name, desc, price, category, color, image } = errors;
    if (name?.type === "required") {
      openNotification("Input Title");
    }
    if (desc?.type === "required") {
      openNotification("Input Description");
    }
    if (price?.type === "required") {
      openNotification("Input Price");
    }
    if (category?.type === "required") {
      openNotification("Input Category");
    }
    if (color?.type === "required") {
      openNotification("Input Color");
    }
    if (image?.type === "required") {
      openNotification("Input Image");
    }
  };

  const openNotification = (form: string) => {
    api.error({
      message: form,
      description: "This field is required. Please insert data",
      placement: "top",
    });
  };

  if (purpose != "upload" && dataProduct?.name === "") {
    return <IsLoadingComponent />;
  }

  return (
    <>
      {contextHolder}
      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
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
                  minLength: 10,
                  maxLength: 50,
                  pattern: /^[A-Za-z0-9\s,.%|&·\-]*$/i,
                })}
                id="product_name"
                placeholder="LA Dodgers League Essential"
                className="input-form"
                defaultValue={
                  purpose != "upload" ? dataProduct?.name : undefined
                }
              />
              {errors?.name?.type === "minLength" && (
                <p className="errorText-form">
                  Product title cannot be less than 10 characters
                </p>
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

            <div className="grid grid-cols-[1fr,_95px] gap-6">
              <div>
                <span className="label-form block">
                  Category
                  <b className="required-input-form">*</b>
                </span>
                <Cascader
                  options={optionsCascader}
                  size="large"
                  placeholder="Select Gender / Select Category"
                  expandTrigger="hover"
                  defaultValue={
                    purpose != "upload"
                      ? dataProduct && [
                          dataProduct.gender,
                          dataProduct.category,
                        ]
                      : undefined
                  }
                  displayRender={displayRender}
                  {...register("category", {
                    required: true,
                  })}
                  onChange={onChangeCascader}
                />
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
                    defaultValue={
                      purpose != "upload" ? dataProduct?.price : undefined
                    }
                    id="product_price"
                    placeholder="35"
                    className="input-form"
                  />
                </div>
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

            <div className="grid grid-cols-[repeat(2,_minmax(0,_1fr))] gap-6">
              <div>
                <span className="label-form block">
                  Color
                  <b className="required-input-form">*</b>
                </span>
                <Select
                  showSearch
                  size="large"
                  placeholder="Select a Color"
                  optionFilterProp="children"
                  defaultValue={
                    purpose != "upload" ? dataProduct?.color : undefined
                  }
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
          <div className="flex flex-col gap-6 max-w-[144px] mx-auto">
            <div>
              <span className="label-form">
                Upload Picture
                <b className="required-input-form">*</b>
              </span>
              <div className={`${purpose != "upload" ? "cursor-no-drop" : ""}`}>
                {imagePreview ? (
                  <button
                    onClick={handleFileDelete}
                    className={`relative label-file-form group overflow-hidden ${
                      purpose != "upload" ? "pointer-events-none" : ""
                    }`}
                  >
                    <Image
                      src={imagePreview}
                      alt="profile icon"
                      width={120}
                      height={120}
                      className="block w-[120px] h-[120px] m-[11.5px] object-cover rounded-sm"
                      placeholder="blur"
                      blurDataURL={imagePreview}
                      priority
                    />
                    <div className="label-file-preview-form group-hover:opacity-100 group-hover:bg-black group-hover:bg-opacity-40">
                      <DeleteOutlined />
                    </div>
                  </button>
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
                  </>
                )}
              </div>
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
              minLength: 110,
              pattern: /^[A-Za-z0-9\s,.%|&·\-]+$/i,
            })}
            defaultValue={purpose != "upload" ? dataProduct?.desc : undefined}
            id="product_desc"
            placeholder="Structured crown, Snapback, Curved visor, Mesh back and..."
            className="input-form max-h-52"
            rows={3}
          />
          {errors?.desc?.type === "maxLength" && (
            <p className="errorText-form">
              Description cannot exceed 750 characters
            </p>
          )}
          {errors?.desc?.type === "minLength" && (
            <p className="errorText-form">
              Description cannot be less than 115 characters
            </p>
          )}
          {errors?.desc?.type === "pattern" && (
            <p className="errorText-form">Alphabetical characters only</p>
          )}
        </div>

        <div className="flex justify-center mb-3">
          <input
            type="submit"
            value={purpose != "upload" ? "Update Changes" : "Post Product"}
            className="flex gap-2 px-10 py-2 rounded-xl text-gray-3 text-md bg-slate-2 animated-button focus:ring-slate-1 cursor-pointer"
          />
        </div>
      </form>
    </>
  );
}
