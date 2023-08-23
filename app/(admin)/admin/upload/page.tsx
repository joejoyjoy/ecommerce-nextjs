"use client";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ConfigProvider, message } from "antd";
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
  const [messageApi] = message.useMessage();
  const router = useRouter();

  const onSubmit = async (data: IFormInput) => {
    messageApi.open({
      type: "loading",
      content: "Uploading product to cloud..",
      duration: 0,
    });
    const formData = new FormData();

    formData.append("image", data.image[0]);
    data.image = formData;

    const userId = value._id;

    await dispatch(uploadProduct({ userId, data }));
    messageApi.destroy;
    message.success("Product successfully uploaded");
    router.push("/admin");
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
