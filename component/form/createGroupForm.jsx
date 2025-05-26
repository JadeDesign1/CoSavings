// components/CreateGroupForm.js
"use client";
import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { HiXMark } from "react-icons/hi2";
import { CreateGroupformFields } from "@/utils/data";
import { supabase } from "@/utils/supabase/client";
import { createGroup } from "@/actions/page";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { SubmiBtn } from "../btn";

const CreateGroupForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const initialValues = {
    name: "",
    description: "",
    max_users: "",
    startDate: "",
    contribution_type: "",
    disbursement_type: "",
    amount: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Group name is required")
      .min(3, "Group name must be at least 3 characters"),
    description: Yup.string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters"),
    max_users: Yup.number()
      .required("Max members is required")
      .positive("Number of members must be positive")
      .integer("Number of members must be an integer")
      .min(1, "At least 1 member required"),
    startDate: Yup.date().required("Starting date is required").nullable(),
    contribution_type: Yup.string().required("Contribution type is required"),
    disbursement_type: Yup.string().required("Disbursement type is required"),
    amount: Yup.number()
      .required("Amount per user is required")
      .positive("Amount must be positive"),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    const { data: authUserData, error: authUserError } =
      await supabase.auth.getUser();
    if (authUserError) {
      console.error("user not authenticated, pls try again");
    }

    // Handle creating a new group here
    const { data, error } = await createGroup({
      values,
      userID: authUserData.user.id,
    });
    console.log(data);
    console.log(error);

    if (error) {
      toast.error(error);
      console.error(`error: ${error}`);
    }
    if (data) {
      toast.success("Group created✅");
      router.push("/home");
    }
    setLoading(false);
  };

  return (
    <section className="create-join-group-container max-w-4xl">
      <h2 className="text-2xl text-gray-200 font-bold mb-4 text-center">
        Create Group
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CreateGroupformFields.map((field, index) => {
              return (
                <div
                  className={`mb-2 ${
                    field?.as === "textarea" ? "md:col-span-2" : "col-span-1"
                  }`}
                  key={index}
                >
                  <label className="labelStyle" htmlFor={field.name}>
                    {field.label}
                  </label>
                  {field.type && (
                    <Field
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      className="fieldStyle"
                    />
                  )}

                  {field.as && field.as === "select" && (
                    <Field
                      as={field.as}
                      id={field.name}
                      name={field.name}
                      className="fieldStyle"
                    >
                      {field.options?.map((opt, index) => {
                        return (
                          <option key={index} value={opt.value}>
                            {opt.text}
                          </option>
                        );
                      })}
                    </Field>
                  )}

                  {field.as && field.as === "textarea" && (
                    <Field
                      id={field.name}
                      name={field.name}
                      as={field.as}
                      rows={field.rows}
                      className="fieldStyle"
                    />
                  )}

                  <ErrorMessage
                    name={field.name}
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
              );
            })}
          </div>

          <div className="flex justify-center mt-6">
            <SubmiBtn isSubmitting={loading} text={"Create Group"} />
          </div>
        </Form>
      </Formik>
    </section>
  );
};

export default CreateGroupForm;
