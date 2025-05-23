// components/JoinGroupForm.js
"use client";
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { HiXMark } from "react-icons/hi2";
import { toast } from "react-toastify";
import { supabase } from "@/utils/supabase/client";

const JoinGroupForm = ({ toggleModal }) => {
  const initialValues = {
    groupId: "",
  };

  const validationSchema = Yup.object({
    groupId: Yup.string()
      .required("Group ID is required")
      .min(6, "Group ID must be at least 6 characters"),
  });

  const handleSubmit = async (values) => {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user?.id) {
      toast.error("User not authenticated");
      return;
    }

    // 1. Find the group with the join code
    const { data: group, error: groupError } = await supabase
      .from("groups")
      .select("*")
      .eq("join_code", values.groupId.trim());

    console.log(group);
    console.error(groupError);

    if (groupError || group.length === 0) {
      toast.error("Group not found. Please check the code.");
      return;
    }

    // 2. Insert user as a member
    const { data, error: insertError } = await supabase.from("members").insert({
      id: userData.user.id, // assuming 'id' is the primary key or user id
      group_id: group.id,
    });
    console.log(data);

    if (insertError) {
      toast.error("You may already be a member or there was an issue.");
      return;
    }

    toast.success("Group joined successfully 🎉");
    toggleModal();
  };

  return (
    <section className="modal-container md:top[75px]">
      <div className="create-join-group-container max-w-md ">
        <h2 className="text-2xl font-bold mb-4 text-center">Join Ajo Group</h2>
        <span onClick={() => toggleModal()} className="toggleStyle">
          <HiXMark className="text-red-500" />
        </span>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="groupId"
              >
                Group ID
              </label>
              <Field
                id="groupId"
                name="groupId"
                type="text"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="groupId"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-2 bg-emerald-500 text-white rounded-lg"
              >
                Join Group
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </section>
  );
};

export default JoinGroupForm;
