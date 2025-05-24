"use client";
import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import FormInput from "./inputField";
import Link from "next/link";
import { SubmiBtn } from "../btn";
import { useRouter } from "next/navigation";
import { LoginGoogle } from "./authProviders";
import { login } from "@/actions/page";
import { toast } from "react-toastify";

const LoginForm = () => {
  const router = useRouter();
  const initialValue = {
    email: "",
    password: "",
  };

  const validateSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const submitHandler = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const { status, user } = await login({
      email: values.email,
      password: values.password,
    });
    if (status === "success" && user) {
      toast.success(`login successful` || status);
      router.push("/home");
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
        isSubmitting,
        handleSubmit,
      }) => {
        return (
          <section className="md:top[60px] modal-container">
            <form
              onSubmit={handleSubmit}
              className="px-4 shadow-sm bg-white shadow-[#96b3af] py-4 flex flex-col  rounded-md mx-auto   h-fit text-text mt-12 w-[90%] sm:w-[600px] relative animate-[fadeInUp_0.8s_ease-out_forwards]"
            >
              <h2 className="text-xl lg:text-2xl font-bold pb-2 ">Login</h2>
              <section className="grid grid-cols-1 gap-1">
                <FormInput
                  value={values.email}
                  error={touched.email && errors.email}
                  onBlur={handleBlur("email")}
                  onChange={handleChange("email")}
                  label="Email"
                  placeholder="example@gmail.com"
                />

                <FormInput
                  value={values.password}
                  error={touched.password && errors.password}
                  onBlur={handleBlur("password")}
                  onChange={handleChange("password")}
                  label="password"
                  placeholder="*****"
                  type={"password"}
                />

                <SubmiBtn isSubmitting={isSubmitting} text={"Login"} />
              </section>{" "}
              <LoginGoogle />
              <div className="mt-2 flex items-center">
                <h1>{`Don't have an account?`}</h1>
                <Link className="font-bold ml-2" href="/register">
                  Sign Up
                </Link>
              </div>
              <div className="mt-2 flex items-center">
                <h1>{`Forgot your password?`}</h1>
                <Link className="font-bold ml-2" href="/forgot-password">
                  Reset Password
                </Link>
              </div>
            </form>
          </section>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
