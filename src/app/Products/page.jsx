"use client";

import React, { useState, useEffect } from "react";
import { HashLoader } from "react-spinners";
import Products from "@/Components/Products";

const Page = () => {
   const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <HashLoader color="#f35c7a" size={80} />
      </div>
    );
  }
  return (
    <div className='w-full'>
      <div className='container mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64'>
        <Products />
      </div>
    </div>
  );
};

export default Page;





// "use client";

// import React, { useState } from "react";
// import Products from "@/Components/Products";
// import data from "../API/data.json";

// const Page = () => {
//   const [selectedGender, setSelectedGender] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");

//   const products = data.products;

//   // ✅ استخراج جميع التصنيفات المتاحة ديناميكيًا
//   const categories = [...new Set(products.map((p) => p.category))];

//   // ✅ فلترة المنتجات حسب الاختيارات
//   const filteredProducts = products.filter((product) => {
//     const genderMatch = selectedGender ? product.gender === selectedGender : true;
//     const categoryMatch = selectedCategory ? product.category === selectedCategory : true;
//     return genderMatch && categoryMatch;
//   });

//   return (
//     <div className="w-full">
//       <div className="container mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
//         <h1 className="text-3xl font-bold mb-8">All Products</h1>

//         {/* 🔥 Filters UI */}
//         <div className="flex flex-wrap gap-4 mb-8">
//           {/* Gender Filter */}
//           <select
//             value={selectedGender}
//             onChange={(e) => setSelectedGender(e.target.value)}
//             className="border px-4 py-2 rounded bg-white"
//           >
//             <option value="">All Genders</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//           </select>

//           {/* Category Filter */}
//           <select
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//             className="border px-4 py-2 rounded bg-white"
//           >
//             <option value="">All Categories</option>
//             {categories.map((cat) => (
//               <option key={cat} value={cat}>{cat}</option>
//             ))}
//           </select>
//         </div>

//         {/* ✅ Products Component with filtered products */}
//         <Products products={filteredProducts} />
//       </div>
//     </div>
//   );
// };

// export default Page;
