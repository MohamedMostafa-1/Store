"use client";

import Products from "@/Components/Products";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    title: "Summer Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/1486064/pexels-photo-1486064.jpeg",
    url: "/Products",
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
  },
  {
    id: 2,
    title: "Winter Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/5337778/pexels-photo-5337778.jpeg",
    url: "/Products",
    bg: "bg-gradient-to-r from-pink-50 to-blue-50",
  },
  {
    id: 3,
    title: "Spring Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800",
    url: "/Products",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  // Auto Slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="relative h-[calc(100vh-80px)] overflow-hidden">
        <div
          className="w-max h-full flex transition-all ease-in-out duration-1000"
          style={{ transform: `translateX(-${current * 100}vw)` }}
        >
          {slides.map((slide) => (
            <div
              className={`${slide.bg} w-screen h-full flex flex-col gap-16 md:flex-row`}
              key={slide.id}
            >
              {/* Text Container */}
              <div className="h-1/2 md:w-1/2 md:h-full flex flex-col items-center justify-center gap-8 2xl:gap-12 text-center">
                <h2 className="text-xl lg:text-3xl 2xl:text-5xl">{slide.description}</h2>
                <h1 className="text-5xl lg:text-6xl 2xl:text-8xl font-semibold">{slide.title}</h1>
                <Link href={slide.url}>
                  <button className="rounded-md bg-black text-white py-3 px-4">
                   SHOP NOW
                    
                  </button>
                </Link>
              </div>
              {/* Image Container */}
              <div className="h-1/2 md:w-1/2 md:h-full sm:h-[200px] relative">
                <Image
                  src={slide.img}
                  alt={slide.title}
                  fill
                  sizes="100vw"
                  className=""
                />
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="absolute left-1/2 bottom-8 transform -translate-x-1/2 flex gap-4">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`w-2 h-2 rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${
                current === index ? "scale-150" : ""
              }`}
              onClick={() => setCurrent(index)}
            >
              {current === index && (
                <div className="w-[6px] h-[6px] bg-gray-600 rounded-full"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-3xl font-bold">Products</h1>
        <Products />
      </div>
    </div>
  );
}
