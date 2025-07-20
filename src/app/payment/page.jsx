"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";

const PaymentPage = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    bankAccount: "",
    paypalEmail: "",
  });

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    const sum = storedCart.reduce(
      (acc, item) => acc + parseFloat(item.price) * (item.quantity || 1),
      0
    );
    setTotal(sum);
  }, []);

  const handleChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Basic Validation per method
    if (paymentMethod === "card") {
      if (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv) {
        Swal.fire({
          icon: "warning",
          title: "Missing Card Info",
          text: "Please fill in all card fields.",
          confirmButtonColor: "#f35c7a",
        });
        return;
      }
    }

    if (paymentMethod === "bank" && !paymentData.bankAccount) {
      Swal.fire({
        icon: "warning",
        title: "Missing Bank Info",
        text: "Please enter your bank account number.",
        confirmButtonColor: "#f35c7a",
      });
      return;
    }

    if (paymentMethod === "paypal" && !paymentData.paypalEmail) {
      Swal.fire({
        icon: "warning",
        title: "Missing PayPal Info",
        text: "Please enter your PayPal email.",
        confirmButtonColor: "#f35c7a",
      });
      return;
    }

    // ✅✅ Success payment alert
    Swal.fire({
      icon: "success",
      title: "Payment Successful!",
      text: `Payment completed via ${paymentMethod}.`,
      confirmButtonColor: "#f35c7a",
      timer: 2000,
      timerProgressBar: true,
    }).then(() => {
      // ✅✅ حفظ الطلب الأخير قبل حذف cart بشكل سليم (نسخة منفصلة)
      localStorage.setItem("lastOrder", JSON.stringify(cart));

      // 🗑️ حذف cart بعد الحفظ
      localStorage.removeItem("cart");

      // ✅ الانتقال لصفحة الفاتورة
      window.location.href = "/confirm";
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">💳 Payment</h1>

        {/* Order Summary */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex gap-4 items-center">
                <Image
                  src={item.image1}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="rounded"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.quantity || 1} x ${parseFloat(item.price).toFixed(2)}
                  </p>
                </div>
                <p className="font-semibold">
                  ${(parseFloat(item.price) * (item.quantity || 1)).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 border-t pt-4 flex justify-between text-lg font-bold">
            <p>Total:</p>
            <p>${total.toFixed(2)}</p>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
          <div className="space-y-2">
            {["card", "bank", "paypal", "cod"].map((method) => (
              <label key={method} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                {method === "card" && "Credit/Debit Card"}
                {method === "bank" && "Bank Transfer"}
                {method === "paypal" && "PayPal"}
                {method === "cod" && "Cash on Delivery"}
              </label>
            ))}
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {paymentMethod === "card" && (
            <>
              <div>
                <label className="block mb-1 font-medium">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={paymentData.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Expiry Date</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={paymentData.expiryDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>

                <div className="flex-1">
                  <label className="block mb-1 font-medium">CVV</label>
                  <input
                    type="password"
                    name="cvv"
                    value={paymentData.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
              </div>
            </>
          )}

          {paymentMethod === "bank" && (
            <div>
              <label className="block mb-1 font-medium">Bank Account Number</label>
              <input
                type="text"
                name="bankAccount"
                value={paymentData.bankAccount}
                onChange={handleChange}
                placeholder="e.g. 01234567890123"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
          )}

          {paymentMethod === "paypal" && (
            <div>
              <label className="block mb-1 font-medium">PayPal Email</label>
              <input
                type="email"
                name="paypalEmail"
                value={paymentData.paypalEmail}
                onChange={handleChange}
                placeholder="example@paypal.com"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#f35c7a] text-white py-3 rounded-full font-semibold hover:bg-pink-600 transition duration-300"
          >
            Confirm Payment
          </button>
        </form>

        <div className="text-center mt-6">
          <Link href="/cart">
            <span className="text-pink-600 hover:underline">Back to Cart</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
