"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ConfirmOrderPage = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [date, setDate] = useState("");
  const invoiceRef = useRef(null);

  useEffect(() => {
    // ✅ جلب الطلب الأخير
    const storedOrder = JSON.parse(localStorage.getItem("lastOrder")) || [];
    console.log("Stored Order:", storedOrder);
    setCart(storedOrder);

    // ✅ حساب Total
    const sum = storedOrder.reduce(
      (acc, item) => acc + parseFloat(item.price) * (item.quantity || 1),
      0
    );
    setTotal(sum);

    // ✅ التاريخ والوقت الحالي
    const now = new Date();
    const formatted = now.toLocaleString("en-US", {
      dateStyle: "full",
      timeStyle: "medium",
    });
    setDate(formatted);
  }, []);

 const handleDownloadPDF = async () => {
  const input = invoiceRef.current;
  if (!input) {
    alert("Invoice not ready yet.");
    return;
  }

  try {
    console.log("Generating PDF for input:", input);
    const canvas = await html2canvas(input, { useCORS: true, scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("invoice.pdf");
  } catch (err) {
    console.error("Error generating PDF:", err);
    alert("Failed to generate PDF. Check console for details.");
  }
};


  return (
    <div className="container mx-auto px-4 py-12">
      <div ref={invoiceRef} className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">🧾 Invoice</h1>

        <p className="text-sm text-gray-500 mb-4">Date: {date}</p>
        <p className="text-sm text-gray-500 mb-8">Payment Method: {paymentMethod}</p>

        {/* 🛒 Products */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Products:</h2>
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex items-center gap-4 mb-4">
                <Image
                  src={item.image1 || "/fallback.png"}
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
            ))
          ) : (
            <p className="text-gray-500">No products found.</p>
          )}

          <div className="mt-6 border-t pt-4 flex justify-between text-lg font-bold">
            <p>Total:</p>
            <p>${total.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* ✅ Download PDF Button */}
      <div className="text-center mt-8">
        <button
          onClick={handleDownloadPDF}
          className="bg-pink-500 text-white py-3 px-6 rounded-full font-semibold hover:bg-pink-600 transition"
        >
          Download Invoice as PDF
        </button>
      </div>
    </div>
  );
};

export default ConfirmOrderPage;
