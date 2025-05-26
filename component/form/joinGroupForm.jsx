"use client";
import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { HiXMark } from "react-icons/hi2";
import { toast } from "react-toastify";
import { supabase } from "@/utils/supabase/client";
import { SubmiBtn } from "../btn";
import { useRouter } from "next/navigation";

const JoinGroupForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const initialValues = {
    groupId: "",
  };

  const validationSchema = Yup.object({
    groupId: Yup.string()
      .required("Group ID is required")
      .min(6, "Group ID must be at least 6 characters"),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      if (userError || !userData?.user?.id) {
        toast.error("User not authenticated");
        setLoading(false);
        return;
      }

      const { data: group, error: groupError } = await supabase
        .from("groups")
        .select("*")
        .eq("join_code", values.groupId.trim());

      if (groupError || !group || group.length === 0) {
        toast.error("Group not found. Please check the code.");
        setLoading(false);
        return;
      }

      const groupId = group[0].id;
      const userName = userData.user.user_metadata?.name || "Unknown User";

      const { data, error: insertError } = await supabase
        .from("members")
        .insert({
          user_id: userData.user.id,
          group_id: groupId,
          name: userName,
        });

      console.log(data);

      if (insertError) {
        toast.error("You may already be a member or there was an issue.");
        setLoading(false);
        return;
      }

      toast.success("Group joined successfully 🎉");
      router.push("/home");
    } catch (error) {
      toast.error("An unexpected error occurred.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="create-join-group-container max-w-md ">
      <h2 className="text-2xl text-gray-200 font-bold mb-4 text-center">
        Join Ajo Group
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-300"
              htmlFor="groupId"
            >
              Group ID
            </label>
            <Field
              id="groupId"
              name="groupId"
              type="text"
              className=" mt-1 outline-none text-gray-300 p-2 w-full bg-slate-700 rounded-md"
            />
            <ErrorMessage
              name="groupId"
              component="div"
              className="text-red-500 pt-2 text-xs"
            />
          </div>

          <div className="flex justify-center">
            <SubmiBtn text={"Join Group"} isSubmitting={loading} />
          </div>
        </Form>
      </Formik>
    </section>
  );
};

export default JoinGroupForm;
