"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ConfigProvider, message } from "antd";
import ProtectedRoute from "../../protectedRoute";
import { AppDispatch } from "@/redux/store";
import { updateProduct } from "@/redux/features/product.slice";
import FormProduct from "@/components/ui/FormProduct";
import { findProductById } from "@/lib/actions/product.actions";

interface IFormInput {
  name: string;
  desc: string;
  price: number;
  image: any;
  gender: number;
  category: string;
  color: string;
}

type ProductState = {
  _id: string;
  SKU: string;
  name: string;
  desc: string;
  price: number;
  image: ImageObject;
  gender: number;
  rating: number;
  likes: number;
  category: string;
  color: string;
  publisherId: string;
  createdAt: any;
  updatedAt: any;
  __v: number;
};

type ImageObject = {
  public_id: string;
  secure_url: string;
};

interface UpdateData {
  name: string;
  desc: string;
  price: number;
  gender: number;
  category: string;
  color: string;
  id: string;
}

export default function AdminEdit() {
  const { value, isLoading } = useSelector((store: any) => store.authReducer);
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [productData, setProductData] = useState<ProductState>({
    _id: "",
    SKU: "",
    name: "",
    desc: "",
    price: 0,
    image: {
      public_id: "",
      secure_url: "",
    },
    gender: 0,
    rating: 0,
    likes: 0,
    category: "",
    color: "",
    publisherId: "",
    createdAt: 0,
    updatedAt: 0,
    __v: 0,
  });

  const productId: any = searchParams.get("product");
  const router = useRouter();

  const onSubmit = async (data: IFormInput) => {
    const userId: string = value._id;
    if (
      data.name == productData.name &&
      data.desc == productData.desc &&
      data.price == productData.price &&
      data.category == productData.category &&
      data.gender == productData.gender &&
      data.color == productData.color
    ) {
      message.warning("No changes found yet!");
    } else {
      const updateData: UpdateData = { ...data, id: productData._id };
      await dispatch(updateProduct({ userId, updateData }));
      message.success("Changes updated successfully");
      router.push("/admin");
    }
  };

  useEffect(() => {
    if (productId == null) {
      setIsRedirecting(true);
      router.push("/admin");
    }

    async function findProductOfParams(productId: string) {
      const result = await findProductById(productId);
      if (result === "REDIRECT") {
        setIsRedirecting(true);
        router.push("/admin");
      }
      setProductData(result);
    }
    findProductOfParams(productId);
  }, [isLoading]);

  if (isRedirecting) {
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

  return (
    <ProtectedRoute>
      <main className="responsive p-4">
        <span className="responsive_wrapper flex flex-col max-w-[740px] mb-6 py-4 px-8 bg-gray-0 rounded-lg">
          <h2 className="text-2xl mb-4">Edit Product</h2>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#a7afb9",
                borderRadius: 7,
                colorBgContainer: "#f9fafb",
                colorTextPlaceholder: "#a7afb9",
                fontWeightStrong: 300
              },
            }}
          >
            <FormProduct
              purpose={"edit"}
              dataProduct={productData}
              onSubmit={onSubmit}
            />
          </ConfigProvider>
        </span>
      </main>
    </ProtectedRoute>
  );
}
