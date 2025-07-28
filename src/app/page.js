"use client";

import Products from "@/Components/Products";
import Image from "next/image";
import Link from "next/link";
import imghero from "../../public/LP-1248-Revised-1.jpg";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div>
      {/* Hero Image with Overlay Text and Animation */}
      <div className="relative h-[100vh] overflow-hidden">
        <Image
          src={imghero}
          alt="Hero Image"
          fill
          sizes="100vw"
          className="object-cover"
        />

        {/* Overlay Layer */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Animated Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-white text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg"
          >
            Discover Our Exclusive Collection
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-white text-lg md:text-2xl mb-6 drop-shadow-md"
          >
            Stylish, Modern & Affordable – Just for You
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4 }}
          >
            <Link href="/Products">
              <button className="bg-white text-black px-6 py-3 text-lg font-semibold rounded hover:bg-gray-200 transition">
                Shop Now
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Products Section */}
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-3xl font-bold">Products</h1>
        <Products />
      </div>
    </div>
  );
}
