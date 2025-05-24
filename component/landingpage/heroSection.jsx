import Image from "next/image";
import React from "react";
import { Btn1 } from "../btn";

const HeroSection = () => {
  return (
    <div>
      <section className="bg-white pt-16 md:pt-20 px-6 text-center h-screen max-w-8xl mx-auto grid grid-cols-1 items-center justify-center relative">
        <div className="w-full">
          <h1 className="lg:text-5xl md:text-3xl text-xl font-serif uppercase text-emerald-900 font-bold mb-4">
            Save Smarter, Together.
          </h1>
          <p className="lg:text-lg md:text-base text-sm font-semibold text-gray-500 mb-6 max-w-xl mx-auto">
            Easily manage your cooperative contributions, payouts, and group
            savings goals — all in one place.
          </p>
          <div className="flex justify-center space-x-4">
            <Btn1> Get Started</Btn1>
          </div>
        </div>
        <div className=" -mt-16 md:w-1/2 mx-auto md:h-[50vh] h-[40vh] ">
          <Image
            src="/savings.gif"
            alt="Illustration"
            width={1000}
            height={1000}
            className="w-full h-full"
          />
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
