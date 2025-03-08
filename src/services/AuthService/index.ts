/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import { IUser } from "@/types";

export const registerUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    const result = await res.json();

    // ?setting accessToken in cookies
    if (result.success) {
      (await cookies()).set("accessToken", result?.data?.accessToken);
    }
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();

    // ?setting accessToken in cookies
    if (result.success) {
      (await cookies()).set("accessToken", result?.data?.accessToken);
    }
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

//* used in userContext to get current logged in user
export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  let decodedData = null;

  if (accessToken) {
    decodedData = await jwtDecode(accessToken);

    return decodedData;
  } else {
    return null;
  }
};

export const userProfile = async (userId:IUser) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/profile/${userId}`
      // {
      //   next: {
      //     tags: ["MEDICINE"],
      //   },
      // }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const logout = async () => {
  (await cookies()).delete("accessToken");
};
