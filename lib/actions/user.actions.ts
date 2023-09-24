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
      await updateUserLastSingIn(user);
      return JSON.parse(JSON.stringify(user));
    }

    await User.create({
      name,
      email,
      image,
    });

    const newUser = await User.findOne({ email });

    return JSON.parse(JSON.stringify(newUser));
  } catch (error: any) {
    throw new Error(
      `Failed to create/update user by checkUser Fn(): ${error.message}`
    );
  }
}

export async function updateUserLastSingIn(user: any) {
  connectToDB();

  try {
    await User.findOneAndUpdate(
      { _id: user._id },
      {
        updatedAt: new Date().toISOString(),
        $inc: { timesSignedIn: 1 },
      },
      { upsert: true }
    );
  } catch (error: any) {
    throw new Error(`Failed to update user last sign-in: ${error.message}`);
  }
}

export async function getUserById({ userId }: { userId: string }) {
  connectToDB();

  try {
    const user = await User.findById(userId);
    
    if (user !== null) {
      return JSON.parse(JSON.stringify(user));
    }

    return JSON.parse(
      JSON.stringify({
        error: {
          message: "No matching user with given Id",
        },
      })
    );
  } catch (error: any) {
    throw new Error(
      `Failed to create/update user by checkUser Fn(): ${error.message}`
    );
  }
}
