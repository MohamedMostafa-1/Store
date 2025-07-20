
'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Logo from '../../public/logo.png';
import { BsCart3 } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const NavBar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(cart.length);
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    window.addEventListener('storage', updateCartCount);
    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  return (
    <div className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative shadow-sm bg-white">
      <div className="flex justify-between items-center h-full">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src={Logo} alt="logo" width={30} height={30} />
          <div className="text-lg font-bold tracking-wide">StoreCodix</div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6">
          <Link href="/" className="font-bold hover:text-[#F35C7A]">Home</Link>
          <Link href="/Products" className="font-bold hover:text-[#F35C7A]">Shop</Link>
          <Link href="/deals" className="font-bold hover:text-[#F35C7A]">Deals</Link>
          <Link href="/about" className="font-bold hover:text-[#F35C7A]">About</Link>
          <Link href="/contact" className="font-bold hover:text-[#F35C7A]">Contact</Link>
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-6">
          <Link href="/profile">
            <CgProfile className="cursor-pointer text-[#f35c7a]" size={25} />
          </Link>
          <div className="relative cursor-pointer">
            <Link href="/cart">
              <BsCart3 className="text-[#f35c7a]" size={25} />
            </Link>
            {cartCount > 0 && (
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#F35C7A] rounded-full flex items-center justify-center text-white text-xs">
                {cartCount}
              </div>
            )}
          </div>

          {/* Hamburger menu icon */}
          <div className="md:hidden">
            {isMenuOpen ? (
              <HiX size={28} className="text-[#f35c7a]" onClick={() => setIsMenuOpen(false)} />
            ) : (
              <HiMenuAlt3 size={28} className="text-[#f35c7a]" onClick={() => setIsMenuOpen(true)} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-4 z-50">
          <Link href="/" className="font-bold hover:text-[#F35C7A]" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link href="/Products" className="font-bold hover:text-[#F35C7A]" onClick={() => setIsMenuOpen(false)}>Shop</Link>
          <Link href="/deals" className="font-bold hover:text-[#F35C7A]" onClick={() => setIsMenuOpen(false)}>Deals</Link>
          <Link href="/about" className="font-bold hover:text-[#F35C7A]" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link href="/contact" className="font-bold hover:text-[#F35C7A]" onClick={() => setIsMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;















// "use client";

// import Link from "next/link";
// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import Logo from "../../public/logo.png";
// import { BsCart3 } from "react-icons/bs";
// import { CgProfile } from "react-icons/cg";
// import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

// const NavBar = () => {
//   const [cartCount, setCartCount] = useState(0);
//   const [menuOpen, setMenuOpen] = useState(false);

//   const updateCartCount = () => {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCartCount(cart.length);
//   };

//   useEffect(() => {
//     updateCartCount();
//     window.addEventListener("cartUpdated", updateCartCount);
//     window.addEventListener("storage", updateCartCount);
//     return () => {
//       window.removeEventListener("cartUpdated", updateCartCount);
//       window.removeEventListener("storage", updateCartCount);
//     };
//   }, []);

//   return (
//     <div className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative shadow-sm bg-white flex items-center justify-between">
//       {/* Logo Always Visible */}
//       <Link href="/" className="flex items-center gap-3">
//         <Image src={Logo} alt="logo" width={30} height={30} />
//         <div className="text-lg font-bold tracking-wide">CodiX-Store</div>
//       </Link>

//       {/* Desktop Links */}
//       <div className="hidden md:flex md:items-center md:gap-6">
//         <Link href="/" className="font-bold hover:text-[#F35C7A]">Home</Link>
//         <Link href="/Products" className="font-bold hover:text-[#F35C7A]">Shop</Link>
//         <Link href="/deals" className="font-bold hover:text-[#F35C7A]">Deals</Link>
//         <Link href="/about" className="font-bold hover:text-[#F35C7A]">About</Link>
//         <Link href="/contact" className="font-bold hover:text-[#F35C7A]">Contact</Link>
//       </div>

//       {/* Right Icons */}
//       <div className="flex items-center gap-4">
//         <Link href="/profile">
//           <CgProfile className="cursor-pointer text-[#f35c7a]" size={25} />
//         </Link>
//         <Link href="/cart" className="relative">
//           <BsCart3 className="cursor-pointer text-[#f35c7a]" size={25} />
//           {cartCount > 0 && (
//             <span className="absolute -top-2 -right-2 bg-[#F35C7A] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//               {cartCount}
//             </span>
//           )}
//         </Link>

//         {/* Mobile Menu Button */}
//         <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-[#f35c7a]">
//           {menuOpen ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
//         </button>
//       </div>

//       {/* Mobile Menu Dropdown */}
//       {menuOpen && (
//         <div className="absolute top-20 left-0 w-full bg-white shadow-md flex flex-col items-center py-4 md:hidden z-50">
//           <Link href="/" className="py-2 font-bold hover:text-[#F35C7A]" onClick={() => setMenuOpen(false)}>Home</Link>
//           <Link href="/Products" className="py-2 font-bold hover:text-[#F35C7A]" onClick={() => setMenuOpen(false)}>Shop</Link>
//           <Link href="/deals" className="py-2 font-bold hover:text-[#F35C7A]" onClick={() => setMenuOpen(false)}>Deals</Link>
//           <Link href="/about" className="py-2 font-bold hover:text-[#F35C7A]" onClick={() => setMenuOpen(false)}>About</Link>
//           <Link href="/contact" className="py-2 font-bold hover:text-[#F35C7A]" onClick={() => setMenuOpen(false)}>Contact</Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NavBar;












