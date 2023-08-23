"use server";

import { revalidatePath } from "next/cache";
import User from "@/models/user.model";
import Product from "@/models/product.model";
import { connectToDB } from "../mongoose";
import cloudinary from "cloudinary";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import os from "os";
import {
  generateSKU,
  generateRating,
  generateNumber,
} from "@/utils/generateFakeValue";

interface Props {
  name: string;
  desc: string;
  price: number;
  image: any;
  gender: number;
  category: string;
  color: string;
}
interface UpdateData {
  name: string;
  desc: string;
  price: number;
  gender: number;
  category: string;
  color: string;
  id: string;
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

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

async function savePhotosToLocal(formData: any) {
  const images = formData.getAll("image");
  const image = images[0];

  const buffersPromise = images.map((pic: any) =>
    pic.arrayBuffer().then(async (data: any) => {
      const buffer = Buffer.from(data);
      const name = uuidv4();
      const ext = image.type.split("/")[1];

      const tmpdir = os.tmpdir();
      const uploadDir = path.join(tmpdir, `/${name}.${ext}`);

      await fs.writeFile(uploadDir, buffer);

      return {
        filepath: uploadDir,
        filename: image.name,
      };
    })
  );
  return await Promise.all(buffersPromise);
}

async function uploadPhotoToCloudinary(newPicture: any) {
  const photosPromise = newPicture.map((pic: any) =>
    cloudinary.v2.uploader.upload(pic.filepath, {
      folder: "HatsAndCaps_eCommerce_NextJS",
    })
  );
  return await Promise.all(photosPromise);
}

async function uploadPhoto(formData: any) {
  try {
    // Save photo files to temporally folder
    const newPicture = await savePhotosToLocal(formData);

    // Upload to the cloud after saving the photo file to the temp folder
    const photo = await uploadPhotoToCloudinary(newPicture);

    // Delete photo files in temp folder after successful upload
    type Timer = ReturnType<typeof setTimeout>;
    const timer: Timer = setTimeout(() => {
      newPicture.map((pic) => fs.unlink(pic.filepath));
    }, 2500);

    revalidatePath("/");

    const imageArr = [
      {
        public_id: photo[0].public_id,
        secure_url: photo[0].secure_url,
      },
    ];

    return imageArr;
  } catch (error: any) {
    throw new Error(
      `Failed to uploadPhoto by admin. Fn() uploadPhoto: ${error.message}`
    );
  }
}

export async function publishProduct(
  userId: string,
  { name, desc, price, image, gender, category, color }: Props
) {
  connectToDB();

  try {
    const user = await User.findById(userId);

    const uploadPicture = await uploadPhoto(image);

    const SKU = generateSKU();
    const rating = generateRating();
    const likes = generateNumber();

    if (user) {
      await Product.create({
        SKU,
        name,
        desc,
        price,
        image: uploadPicture[0],
        gender,
        rating,
        likes,
        category,
        color,
        publisherId: user._id,
      });
    }

    const productData: ProductState[] = await Product.find();

    return JSON.parse(JSON.stringify(productData));
  } catch (error: any) {
    throw new Error(
      `Failed to publish product by admin. Fn() publishProduct: ${error.message}`
    );
  }
}

export async function allProducts() {
  connectToDB();

  try {
    const res = await Product.find();
    return JSON.parse(JSON.stringify(res));
  } catch (error: any) {
    throw new Error(
      `Failed to fetch product by admin. Fn() allProducts: ${error.message}`
    );
  }
}

export async function deletePictureById(public_id: string) {
  connectToDB();

  try {
    await cloudinary.v2.uploader.destroy(public_id);
    revalidatePath("/");
    return { msg: "Image Deleted Successfully!" };
  } catch (error: any) {
    throw new Error(
      `Failed to delete image of product by admin. Fn() deletePictureById: ${error.message}`
    );
  }
}

export async function deleteProductById(productId: string) {
  connectToDB();

  try {
    const product = await Product.findByIdAndDelete(productId);

    if (product) {
      deletePictureById(product.image.public_id);
    }

    return JSON.parse(JSON.stringify(product._id));
  } catch (error: any) {
    throw new Error(
      `Failed to delete product by admin. Fn() deleteProductById: ${error.message}`
    );
  }
}

export async function findProductById(productId: string) {
  connectToDB();

  try {
    const res = await Product.findById(productId);
    return JSON.parse(JSON.stringify(res));
  } catch (error: any) {
    return "REDIRECT";
  }
}

export async function findProductAndUpdate(
  userId: string,
  updateData: UpdateData
) {
  connectToDB();

  try {
    const res = await Product.findById(updateData.id);

    if (userId === res.publisherId) {
      const product = await Product.findByIdAndUpdate(updateData.id, {
        name: updateData.name,
        desc: updateData.desc,
        price: updateData.price,
        category: updateData.category,
        gender: updateData.gender,
        color: updateData.color,
      });
      return JSON.parse(JSON.stringify(product));
    }
  } catch (error: any) {
    throw new Error(
      `Failed to update product by admin. Fn() findProductAndUpdate: ${error.message}`
    );
  }
}
