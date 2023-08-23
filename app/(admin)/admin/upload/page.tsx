"use client";

import { useDispatch, useSelector } from "react-redux";
import { ConfigProvider } from "antd";
import ProtectedRoute from "../../protectedRoute";
import { AppDispatch } from "@/redux/store";
import { uploadProduct } from "@/redux/features/product.slice";
import FormProduct from "@/components/ui/FormProduct";

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
  const { value } = useSelector((store: any) => store.authReducer);
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (data: IFormInput) => {
    const formData = new FormData();

    formData.append("image", data.image[0]);
    data.image = formData;

    const userId = value._id;

    await dispatch(uploadProduct({ userId, data }));
  };

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
            <FormProduct purpose={"upload"} onSubmit={onSubmit} />
          </ConfigProvider>
        </span>
      </main>
    </ProtectedRoute>
  );
}
