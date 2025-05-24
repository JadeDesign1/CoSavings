"use client";
import React, { useEffect, useState } from "react";
import { SubmiBtn } from "../btn";
import { supabase } from "@/utils/supabase/client";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  // useEffect(() => {
  //   const getProfile = async () => {
  //     const {data:users, error} = await supabase.from("profiles").select("email")
  //   }
  // },[])
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const { data, error: usersError } =
      await supabase.auth.resetPasswordForEmail(email);

    if (usersError) {
      setError(usersError.message);
    } else {
      toast.success("Password reset email sent. Check your inbox.");
    }

    setLoading(false);
  };

  return (
    <div className="md:top[60px] modal-container">
      <form
        onSubmit={handleSubmit}
        className="px-4 shadow-sm bg-white shadow-[#96b3af] py-4 flex flex-col  rounded-md mx-auto   h-fit text-text mt-12 w-[90%] sm:w-[600px] relative animate-[fadeInUp_0.8s_ease-out_forwards]"
      >
        <h1 className="text-3xl w-full text-center font-bold mb-6">
          Forgot Password
        </h1>
        <div className="flex flex-col gap-1 relative">
          <label className=" text-base lg:text-lg tracking-wider capitalize font-semibold text-black">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="Email"
            name="email"
            className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-400 outline-none bg-white text-sm text-gray-700"
          />
          <div className="ml-auto mr-4 h-4">
            {error && <span className="text-red-500 text-xs ">{error}</span>}
          </div>
        </div>

        <div className="">
          <SubmiBtn text={"Submit"} isSubmitting={loading} />
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
