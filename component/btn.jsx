import React from "react";

export const Btn1 = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-[var(--primary)] hover:bg-[var(--black-primary)] text-white duration-200 px-6 py-2 rounded-full shadow-md transition-all border border-[#2f7caf]`}
    >
      {children}
    </button>
  );
};
export const Btn2 = ({ children }) => {
  return (
    <button
      className={` bg-inherit text-emerald-900 px-6 py-2 rounded-full hover:bg-gray-100 border border-emerald-500 transition-all shadow-md`}
    >
      {children}
    </button>
  );
};

export const SubmiBtn = ({ isSubmitting, text }) => {
  return (
    <button
      type="submit"
      className={`${
        isSubmitting
          ? "bg-blue-200 cursor-not-allowed"
          : "bg-blue-300 text-[var(--black-primary)]  text-base"
      } text-center px-8 md:py-2 py-[6px] mt-4 hover:bg-blue-400 duration-200 rounded-md`}
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <h1 className="flex flex-row justify-center items-center gap-2">
          <span>Loading</span>{" "}
          <span className="h-6 w-6 animate-spin rounded-full border-4 border-r-gray-800 border-t-gray-950 border-b-gray-500 border-l-white"></span>
        </h1>
      ) : (
        <>{text}</>
      )}
    </button>
  );
};
