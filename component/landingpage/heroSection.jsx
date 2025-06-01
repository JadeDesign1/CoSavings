"use client";
import Image from "next/image";
import React from "react";
import { Btn1 } from "../btn";
import { FiShield, FiClock, FiUsers } from "react-icons/fi";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="min-h-screen md:h-screen w-full px-6 pt-12 lg:pt-8 pb-4 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center md:pt-16 lg:pt-2 justify-between md:gap-8">
        {/* Left Section */}
        <motion.div
          className="w-full h-1/2 md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-serif uppercase font-bold text-[var(--primary)] mb-2">
            Save Smarter, Together.
          </h1>
          <p className="text-base md:text-lg md:mb-8 text-gray-300 mb-4 font-medium max-w-lg">
            Easily manage your cooperative contributions, payouts, and group
            savings goals — all in one place.
          </p>
          <Btn1>Get Started</Btn1>

          {/* Micro Features */}
          <div className="mt-10 grid grid-cols-3 sm:grid-cols-3 gap-2 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <FiShield className="text-emerald-400 text-lg" />
              Secure & Transparent
            </div>
            <div className="flex items-center gap-2">
              <FiClock className="text-emerald-400 text-lg" />
              Real-Time Tracking
            </div>
            <div className="flex items-center gap-2">
              <FiUsers className="text-emerald-400 text-lg" />
              Easy Group Management
            </div>
          </div>
        </motion.div>

        {/* Right Section - Illustration */}
        <motion.div
          className="w-full md:w-1/2 xl:w-[48%] h-auto "
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Image
            src="/svg6.svg"
            alt="Illustration"
            width={1000}
            height={1000}
            className="w-full max-w-md md:max-w-full mx-auto"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
