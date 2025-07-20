"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=200",
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setUser({ ...user, avatar: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    setEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-100 via-white to-pink-100 py-12 px-4">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <Image
              src={user.avatar}
              alt="Profile"
              width={120}
              height={120}
              className="rounded-full object-cover border-4 border-pink-400 shadow-md"
            />
            {editing && (
              <div className="absolute bottom-0 right-0">
                <label className="bg-pink-500 text-white px-2 py-1 text-xs rounded-full cursor-pointer hover:bg-pink-600 transition">
                  Edit
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>
          <h1 className="text-2xl font-bold mt-4">{user.name || "Your Name"}</h1>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              disabled={!editing}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              disabled={!editing}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={user.phone}
              disabled={!editing}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={user.address}
              disabled={!editing}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 disabled:bg-gray-100"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          {editing ? (
            <button
              onClick={handleSave}
              className="bg-pink-500 text-white py-2 px-6 rounded-full font-semibold hover:bg-pink-600 transition"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="bg-pink-500 text-white py-2 px-6 rounded-full font-semibold hover:bg-pink-600 transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
