"use client";

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { 
  FaFacebookF, FaInstagram, FaYoutube, FaPinterestP, 
   FaCcVisa, FaCcMastercard, FaCcDiscover 
} from "react-icons/fa";

import { SiSkrill } from "react-icons/si";
import { FaCcPaypal } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="py-16 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 bg-gray-100 text-sm mt-24  shadow-md">
      {/* TOP */}
      <div className="flex flex-col md:flex-row justify-between gap-16">
        {/* LEFT */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-6">
          <Link href="/" className="text-2xl font-bold tracking-wide text-[#f35c7a]">
            CodiX-Store
          </Link>
          <p>3252 Winding Way, Central Plaza, Willowbrook, CA 90210, Egypt</p>
          <span className="font-semibold">EMAIL: codix@gmail.com</span>
          <span className="font-semibold">PHONE: +201010721434</span>
          <div className="flex gap-4 mt-2 text-gray-600">
            <FaFacebookF size={20} className="hover:text-[#1877F2] cursor-pointer" />
            <FaInstagram size={20} className="hover:text-[#C13584] cursor-pointer" />
            <FaYoutube size={20} className="hover:text-[#FF0000] cursor-pointer" />
            <FaPinterestP size={20} className="hover:text-[#E60023] cursor-pointer" />
            <FaTwitter size={20} className="hover:text-black cursor-pointer" />
          </div>
        </div>

        {/* CENTER */}
        <div className="hidden lg:flex justify-between w-1/2">
          <div className="flex flex-col gap-4">
            <h1 className="font-medium text-lg mb-2">COMPANY</h1>
            <Link href="/about" className="hover:text-[#f35c7a]">About Us</Link>
            <Link href="#" className="hover:text-[#f35c7a]">Careers</Link>
            <Link href="#" className="hover:text-[#f35c7a]">Affiliates</Link>
            <Link href="#" className="hover:text-[#f35c7a]">Blog</Link>
            <Link href="/contact" className="hover:text-[#f35c7a]">Contact Us</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="font-medium text-lg mb-2">SHOP</h1>
            <Link href="#" className="hover:text-[#f35c7a]">New Arrivals</Link>
            <Link href="#" className="hover:text-[#f35c7a]">Accessories</Link>
            <Link href="#" className="hover:text-[#f35c7a]">Men</Link>
            <Link href="#" className="hover:text-[#f35c7a]">Women</Link>
            <Link href="/Products" className="hover:text-[#f35c7a]">All Products</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="font-medium text-lg mb-2">HELP</h1>
            <Link href="#" className="hover:text-[#f35c7a]">Customer Service</Link>
            <Link href="#" className="hover:text-[#f35c7a]">My Account</Link>
            <Link href="#" className="hover:text-[#f35c7a]">Find a Store</Link>
            <Link href="#" className="hover:text-[#f35c7a]">Legal & Privacy</Link>
            <Link href="#" className="hover:text-[#f35c7a]">Gift Card</Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-6">
          <h1 className="font-medium text-lg">SUBSCRIBE</h1>
          <p>Be the first to get the latest news about trends, promotions, and much more!</p>
          <div className="flex">
            <input
              type="text"
              placeholder="Email address"
              className="p-3 w-3/4 border border-gray-300 rounded-l-md focus:outline-none"
            />
            <button className="w-1/4 bg-[#f35c7a] text-white rounded-r-md">JOIN</button>
          </div>
          <span className="font-semibold">Secure Payments</span>
          <div className="flex justify-between items-center gap-4 text-2xl text-gray-600">
            <FaCcDiscover className="hover:text-[#86B817] cursor-pointer" />
            {/* <SiSkrill className="hover:text-[#7B3BC1] cursor-pointer" /> */}
            <FaCcPaypal className="hover:text-[#253B80] cursor-pointer" />
            <FaCcMastercard className="hover:text-[#EB001B] cursor-pointer" />
            <FaCcVisa className="hover:text-[#1A1F71] cursor-pointer" />
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-12 pt-4 border-t">
        <div>© {new Date().getFullYear()} CodiX-Store. All rights reserved.</div>
        <div className="flex flex-col md:flex-row gap-4">
          <div>
            <span className="text-gray-500 mr-2">Language:</span>
            <span className="font-medium">English</span>
          </div>
          <div>
            <span className="text-gray-500 mr-2">Currency:</span>
            <span className="font-medium">$ EG</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
