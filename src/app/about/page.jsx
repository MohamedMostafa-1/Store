"use client";

import React from "react";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-pink-50 via-white to-pink-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-pink-600 mb-12">
          About Us
        </h1>

        <div className="mb-12">
          <p className="text-lg text-gray-700 leading-relaxed text-center">
            Welcome to our store! We are passionate about providing high-quality products that add value to your life. Our team works diligently to ensure a seamless shopping experience, fast delivery, and exceptional customer service.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white shadow-lg rounded-xl p-6 text-center">
            <Image
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Mission"
              width={80}
              height={80}
              className="mx-auto mb-4"
            />
            <h2 className="text-xl font-bold mb-2">Our Mission</h2>
            <p className="text-gray-600">
              Deliver premium products to our customers while prioritizing quality, affordability, and innovation.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 text-center">
            <Image
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Vision"
              width={80}
              height={80}
              className="mx-auto mb-4"
            />
            <h2 className="text-xl font-bold mb-2">Our Vision</h2>
            <p className="text-gray-600">
              To become the leading e-commerce platform known for trust, variety, and customer satisfaction worldwide.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 text-center">
            <Image
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Values"
              width={80}
              height={80}
              className="mx-auto mb-4"
            />
            <h2 className="text-xl font-bold mb-2">Our Values</h2>
            <p className="text-gray-600">
              Integrity, customer focus, excellence, teamwork, and continuous improvement.
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} All rights reserved. Designed with ❤️ by Our Team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
