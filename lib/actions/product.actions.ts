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

interface Props {
  name: string;
  desc: string;
  price: number;
  image: any;
  gender: number;
  category: string;
  color: string;
}

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

      /* const uploadDir = path.join(
      process.cwd(),
      "public/uploads",
      `/${name}.${ext}}`
    ); */

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

export async function uploadPhoto(formData: any) {
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
        public_id: photo.public_id,
        secure_url: photo.secure_url
      }
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

    console.log(user);
    console.log(uploadPicture);

    /* if (user) {
      if (image) {
        const uploader = async (path: string) =>
          await uploads(path, "HatsAndCaps_eCommerce_NextJS");

        const file = image;
        const { path } = file;

        const pictureResponse = await uploader(path);
        fs.unlinkSync(path);

        await Product.create({
          name,
          desc,
          price,
          image: pictureResponse,
          gender,
          category,
          color,
        });
      }
    } */
  } catch (error: any) {
    throw new Error(
      `Failed to publish product by admin. Fn() publishProduct: ${error.message}`
    );
  }
}
