"use client";

import React from "react";
import Image from "next/image";
import data from "../API/data.json";
import Swal from "sweetalert2";

const DealsPage = () => {
  const deals = data.products.filter((product) => product.isDeal);

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const isExist = cart.some((item) => item.id === product.id);

    if (isExist) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'info',
        title: `${product.name} is already in your cart.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));

      // ✅ تحديث رقم السلة
      window.dispatchEvent(new Event("cartUpdated"));

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: `${product.name} added to cart!`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-pink-600 mb-12">
          Today's Hot Deals 🔥
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center"
            >
              <div className="relative w-full h-64 mb-4">
                <Image
                  src={product.image1}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg"
                />
                <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                  {product.discountPercent || "20% Off"}
                </span>
              </div>

              <h2 className="text-lg font-bold mb-2">{product.name}</h2>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-gray-500 line-through text-sm">
                  ${product.originalPrice || (product.price + 10).toFixed(2)}
                </span>
                <span className="text-pink-600 font-semibold">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => handleAddToCart(product)}
                className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                Add To Cart
              </button>
            </div>
          ))}
        </div>

        {deals.length === 0 && (
          <p className="text-center text-gray-500 mt-12">
            No deals available right now. Please check back later!
          </p>
        )}
      </div>
    </div>
  );
};

export default DealsPage;
