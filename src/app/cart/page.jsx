"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdRemoveShoppingCart } from "react-icons/md";
import Swal from 'sweetalert2';
import { HashLoader } from "react-spinners"; // ✅ تأكد من استيراده

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ حالة اللودينج

  useEffect(() => {
    const timer = setTimeout(() => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const cartWithQuantity = storedCart.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
        price: parseFloat(item.price),
      }));
      setCart(cartWithQuantity);
      setLoading(false); // ✅ إيقاف اللودينج بعد انتهاء 3 ثواني
    }, 2000);

    return () => clearTimeout(timer); // ✅ تنظيف التايمر عند الخروج
  }, []);


  const updateLocalStorageAndDispatch = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated")); // ✅ تحديث Navbar
  };

  const handleIncrease = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    updateLocalStorageAndDispatch(updatedCart);
  };

  const handleDecrease = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
    updateLocalStorageAndDispatch(updatedCart);
  };

  const handleRemove = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to remove this product from the cart?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f35c7a',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      focusCancel: true
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCart = cart.filter((item) => item.id !== id);
        setCart(updatedCart);
        updateLocalStorageAndDispatch(updatedCart);

        // ✅ Toast confirmation
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Product removed',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <HashLoader color="#f35c7a" size={80} />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty 🛒</h1>
        <Link href="/Products">
          <span className="text-[#f35c7a] hover:underline">Continue Shopping</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="grid gap-6">
        {cart.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="flex items-center justify-between border-b pb-4"
          >
            <div className="flex items-center gap-4">
              <Image
                src={item.image1}
                alt={item.name}
                width={80}
                height={80}
                className="rounded"
              />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-500">${item.price.toFixed(2)}</p>

                <div className="flex items-center mt-2">
                  <button
                    onClick={() => handleDecrease(item.id)}
                    className="bg-gray-200 px-2 rounded text-lg"
                  >
                    -
                  </button>
                  <span className="mx-4">{item.quantity}</span>
                  <button
                    onClick={() => handleIncrease(item.id)}
                    className="bg-gray-200 px-2 rounded text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-500 hover:underline mt-2 block cursor-pointer"
              >
                <MdRemoveShoppingCart size={30} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-between items-center border-t pt-4">
        <p className="text-xl font-semibold">Total:</p>
        <p className="text-2xl font-bold text-[#f35c7a]">${total.toFixed(2)}</p>
      </div>

      <div className="mt-6 text-right">
        <button className="bg-[#f35c7a] text-white px-6 py-3 rounded-full hover:bg-pink-600 transition duration-300">
          <Link href="/checkout">Checkout</Link>
        </button>
      </div>
    </div>
  );
};

export default CartPage;
