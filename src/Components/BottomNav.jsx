"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { BsCart3 } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { MdStorefront } from "react-icons/md";

const BottomNav = () => {
  const pathname = usePathname();

  const links = [
    { href: "/", icon: <AiFillHome size={26} />, label: "Home" },
    { href: "/Products", icon: <MdStorefront size={26} />, label: "Shop" },
    { href: "/profile", icon: <CgProfile size={26} />, label: "Profile" },
    { href: "/cart", icon: <BsCart3 size={26} />, label: "Cart" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-screen bg-white border-t shadow-md flex justify-around items-center py-2 z-50 md:hidden">
      {links.map((link) => (
        <Link
          href={link.href}
          key={link.label}
          className="flex flex-col items-center text-gray-600 hover:text-[#F35C7A] transition duration-200 ease-in-out"
        >
          <div className={`${pathname === link.href ? "text-[#F35C7A]" : ""}`}>
            {link.icon}
          </div>
          <span className="text-[10px] mt-1">{link.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default BottomNav;
