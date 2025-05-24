"use client";
import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import FormInput from "./inputField";
import { toast } from "react-toastify";
import Link from "next/link";
import { SubmiBtn } from "../btn";
import { signUp } from "@/actions/page";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();
  const initialValue = {
    full_name: "",
    email: "",
    password: "",
  };

  const validateSchema = Yup.object().shape({
    full_name: Yup.string().trim().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Minimum of 8 characters"),
  });

  const submitHandler = async (values, { setSubmitting }) => {
    const { status } = await signUp({
      full_name: values.full_name,
      email: values.email,
      password: values.password,
    });

    if (status === "success") {
      toast.success(status);
      // Optionally, delay redirect to allow user to read the toast
      router.push("/login");
    } else {
      toast.error(status);
    }

    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={validateSchema}
      onSubmit={submitHandler}
    >
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        touched,
        handleSubmit,
        isSubmitting,
        setFieldValue,
      }) => {
        const { email, password, full_name } = values;
        return (
          <div className="md:top[75px] modal-container">
            <form
              onSubmit={handleSubmit}
              className="px-4 shadow-sm bg-white shadow-[#96b3af] py-4 flex flex-col rounded-md mx-auto h-fit text-text mt-12 w-[90%] sm:w-[600px] relative animate-[fadeInUp_0.8s_ease-out_forwards]"
            >
              <h2 className="text-xl lg:text-2xl font-bold pb-2">Sign Up</h2>
              <section className="grid grid-cols-1 gap-1">
                <FormInput
                  value={full_name}
                  error={touched.full_name && errors.full_name}
                  onBlur={handleBlur("full_name")}
                  onChange={handleChange("full_name")}
                  label="Name"
                  placeholder="Peter Olayinka"
                />
                <FormInput
                  value={email}
                  error={touched.email && errors.email}
                  onBlur={handleBlur("email")}
                  onChange={handleChange("email")}
                  label="Email"
                  placeholder="example@gmail.com"
                />
                <FormInput
                  value={password}
                  error={touched.password && errors.password}
                  onBlur={handleBlur("password")}
                  onChange={handleChange("password")}
                  label="Password"
                  placeholder="*****"
                  type="password"
                />
                <SubmiBtn isSubmitting={isSubmitting} text={"Create Account"} />
              </section>
              <section className="flex text-base lg:text-lg pt-2 gap-2 flex-row items-center justify-center">
                <span>Already have an account?</span>
                <Link className="hover:underline pb-1" href={"/login"}>
                  Login
                </Link>
              </section>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default Signup;
