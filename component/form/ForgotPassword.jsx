// components/ForgotPassword.js
"use client";
import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { forgotPassword } from "@/actions/page";
import { SubmiBtn } from "../btn";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    const { status } = await forgotPassword({ email: values.email });
    if (status === "success") {
      toast.success("password reset link sent to your email");
    } else {
      toast.error(status);
    }
    setLoading(false);
  };

  return (
    <section className="modal-container md:top[75px]">
      <div className="create-join-group-container max-w-md ">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>

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

            <div className="flex justify-center">
              <SubmiBtn text={"Send Reset Link"} isSubmitting={loading} />
            </div>
          </Form>
        </Formik>
      </div>
    </section>
  );
};

export default ForgotPassword;
