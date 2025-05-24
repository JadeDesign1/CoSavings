// components/ResetPassword.js
"use client";
import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { SubmiBtn } from "../btn";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "@/actions/page";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const initialValues = {
    newPassword: "",
    email: "",
  };

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .required("Password is required")
      .min(6, "Minimum of six characters"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  console.log(searchParams);

  const handleSubmit = async (values) => {
    setLoading(true);
    const error = searchParams.get("error");
    const code = searchParams.get("error_code");
    if (error && code === "otp_expired") {
      toast.error(
        "This link is invalid or has expired. Please request a new one."
      );
    }

    const { status } = await resetPassword({
      values,
      code: searchParams.get("code"),
    });
    console.log(status);

    if (status === "success") {
      toast.success("Your password has been reset successfully");
      router.push("/login");
    } else {
      toast.error(status);
    }
    setLoading(false);
  };

  return (
    <section className="modal-container md:top-[75px]">
      <div className="create-join-group-container max-w-md ">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="text"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="newPassword"
              >
                New Password
              </label>
              <Field
                id="newPassword"
                name="newPassword"
                type="password"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="newPassword"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            <div className="flex justify-center">
              <SubmiBtn text={"Reset Password"} isSubmitting={loading} />
            </div>
          </Form>
        </Formik>
      </div>
    </section>
  );
};

export default ResetPassword;
