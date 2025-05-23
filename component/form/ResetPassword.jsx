"use client";
import React, { useState } from "react";
import { SubmiBtn } from "../btn";
// import { useRouter, useSearchParams } from "next/navigation";

const ResetPassword = () => {
  // const searchParams = useSearchParams();
  const [error, setError] = useState(null);
  // const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    setLoading(false);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-200">
            New Password
          </label>
          <input
            type="password"
            placeholder="Password"
            id="Password"
            name="password"
            className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
          />
        </div>

        <div className="mt-4">
          <SubmiBtn text={"Reset Password"}>Reset Password</SubmiBtn>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
