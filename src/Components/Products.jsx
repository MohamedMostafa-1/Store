"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import data from "../app/API/data.json";
import Swal from 'sweetalert2';


const Products = () => {
  const products = data.products;

 // add to cart functionality
  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.some((item) => item.id === product.id);

    if (!exists) {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));

      // ✅ dispatch custom event to notify others
      window.dispatchEvent(new Event("cartUpdated"));
      // alert ("Product added to cart");
      Swal.fire({
        title: 'Added to Cart!',
        text: `${product.name} has been added to your cart.`,
        icon: 'success',
        confirmButtonColor: '#f35c7a',
        showConfirmButton: false, // ✅ لا يظهر زر OK
        timer: 1500, // مدة الظهور
      });

    } else {
      // alert ("Product already in cart");
      Swal.fire({
        title: 'Already Added',
        text: `${product.name} is already in your cart.`,
        icon: 'info',
        confirmButtonColor: '#f35c7a',
      });

    }
  };

  return (
    <div className="container">
      <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
        {products.map((product) => (
          <div
            key={product.id}
            className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
          >
            {/* details Products  */}
            <Link href={`/Products/${product.id}`}>
              <div className="relative w-full h-80">
                <Image
                  src={product.image1}
                  alt={product.name}
                  fill
                  sizes="25vw"
                  className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease-out duration-500"
                />
                <Image
                  src={product.image2}
                  alt={product.name}
                  fill
                  sizes="25vw"
                  className="absolute object-cover rounded-md"
                />
              </div>
            </Link>

            <div className="flex justify-between">
              <span className="font-medium">{product.name}</span>
              <span className="font-semibold">${product.price}</span>
            </div>
            <div className="text-sm text-gray-500">{product.description}</div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => handleAddToCart(product)}
                className="rounded-2xl ring-1 ring-[#F35C7A] text-[#f35c7a] px-4 py-2 text-xs w-max hover:bg-[#F35C7A] hover:text-white"
              >
                Add To Cart
              </button>

              <Link href={`/Products/${product.id}`}>
                <p className="text-sm font-semibold hover:text-[#f35c7a] hover:underline">
                  More Details
                </p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
