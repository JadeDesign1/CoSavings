"use client";

import { signInWithGoogle } from "@/actions/page";
import React, { useTransition } from "react";
import { FaGoogle } from "react-icons/fa";

export const LoginGoogle = () => {
  const [isPending, startTransition] = useTransition();

  const handleGoogleLogin = () => {
    startTransition(async () => {
      await signInWithGoogle();
    });
  };
  return (
    <div
      onClick={handleGoogleLogin}
      className="w-full gap-4 hover:cursor-pointer mt-4 h-10 bg-gray-800 rounded-md p-4 flex justify-center items-center"
    >
      <FaGoogle className="" />
      <p className="text-white">
        {isPending ? "Redirecting..." : "Login with Google"}
      </p>
    </div>
  );
};
