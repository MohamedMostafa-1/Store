"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import data from "../app/API/data.json";
import { HashLoader } from "react-spinners";
import Image from "next/image";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const found = data.products.find((item) => item.id === parseInt(id));
      setProduct(found);

      if (found) {
        setMainImage(found.image1 || found.image2);
        const relatedItems = data.products.filter(
          (item) => item.categoryId === found.categoryId && item.id !== found.id
        );
        setRelated(relatedItems);
      }

      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [id]);

  const handleRelatedClick = (item) => {
    setProduct(item);
    setMainImage(item.image1 || item.image2);

    const relatedItems = data.products.filter(
      (p) => p.categoryId === item.categoryId && p.id !== item.id
    );
    setRelated(relatedItems);
  };

  const handleAddToCart = () => {
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
        timerProgressBar: true,
      });
    } else {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));

      // ✅ dispatch event to update Navbar cart count
      window.dispatchEvent(new Event("cartUpdated"));

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: `${product.name} added to cart!`,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <HashLoader color="#f35c7a" size={80} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* الصورة الرئيسية */}
        <div className="flex-1 flex justify-center items-center">
          <Image
            src={mainImage}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* تفاصيل المنتج */}
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-2xl font-semibold text-[#f35c7a]">
            ${product.price}
          </p>

          <button
            onClick={handleAddToCart}
            className="bg-[#f35c7a] text-white px-6 py-3 rounded-full hover:bg-pink-600 transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* المنتجات المرتبطة */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {related.map((item) => (
            <div
              key={item.id}
              onClick={() => handleRelatedClick(item)}
              className="cursor-pointer group"
            >
              <div className="relative w-full h-56">
                <Image
                  src={item.image1}
                  alt={item.name}
                  fill
                  className="object-cover rounded-lg group-hover:opacity-80 transition duration-300"
                />
              </div>
              <p className="mt-2 text-center font-medium">{item.name}</p>
              <p className="text-center text-sm text-gray-500">
                ${item.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
