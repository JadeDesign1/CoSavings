"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const FormInput = ({
  label,
  name,
  placeholder,
  onChange,
  error,
  onBlur,
  type,
}) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="flex flex-row items-center justify-between pt-2">
        <label className=" text-base lg:text-lg tracking-wider capitalize text-black">
          {name === "confirm-password" ? "Confirm Password" : label}
        </label>
        {error && <span className="text-red-500 text-xs">{error}</span>}
      </div>
      <div className="relative w-full">
        <input
          type={type === "password" && !show ? "password" : "text"} // ✅ Toggles input type
          className="outline-none pl-2  w-full bg-gray-200  rounded-md text-base py-1"
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute text-2xl z-30 lg:top-2 lg:right-3 top-1 right-2 text-gray-500 hover:text-gray-400"
          >
            {show ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
    </>
  );
};

export default FormInput;
