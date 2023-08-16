"use server";

import User from "@/models/user.model";
import { connectToDB } from "../mongoose";

interface Props {
  name: string;
  email: string;
  image: string;
}

export async function checkUser({ name, email, image }: Props) {
  connectToDB();

  try {
    const user = await User.findOne({ email });

    if (user) {
      return updateUserLastSingIn(user);
    }

    await User.create({
      name,
      email,
      image,
    });
    
  } catch (error: any) {
    throw new Error(
      `Failed to create/update user by checkUser Fn(): ${error.message}`
    );
  }

  return checkUser;
}

export async function updateUserLastSingIn(user: any) {
  connectToDB();

  try {
    await User.findOneAndUpdate(
      { _id: user._id },
      {
        updatedAt: new Date().toISOString(),
      },
      { upsert: true }
    );
  } catch (error: any) {
    throw new Error(`Failed to update user last sign-in: ${error.message}`);
  }
}
