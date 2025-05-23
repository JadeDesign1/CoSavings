import React from "react";

const FormField = ({ Field, ErrorMessage }) => {
  return (
    <div className="mb-4">
      <label
        className="block text-sm font-medium text-gray-700"
        htmlFor="groupName"
      >
        Group Name
      </label>
      <Field
        id="groupName"
        name="groupName"
        type="text"
        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
      />
      <ErrorMessage
        name="groupName"
        component="div"
        className="text-red-500 text-xs"
      />
    </div>
  );
};

export default FormField;
