"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MdArrowBack, MdEdit, MdLogout, MdSettings, MdInfo } from "react-icons/md";
import { FaCar, FaPhone, FaIdCard } from "react-icons/fa";

export default function ProfilePage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [showEditName, setShowEditName] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) {
      setUserName(name);
      setNewName(name);
    }
  }, []);

  const handleUpdateName = () => {
    if (newName.trim()) {
      localStorage.setItem("userName", newName.trim());
      setUserName(newName.trim());
      setShowEditName(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userName");
    router.push("/splash");
  };

  const profileStats = [
    { label: "Total Trips", value: "1,247", color: "bg-blue-500" },
    { label: "Total Earnings", value: "₹1,24,350", color: "bg-green-500" },
    { label: "Rating", value: "4.8 ⭐", color: "bg-yellow-500" },
  ];

  return (
    <div className="min-h-screen bg-light pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary to-primary text-white p-6 shadow-lg">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <MdArrowBack className="text-2xl" />
          </button>
          <h1 className="text-2xl font-bold">Profile</h1>
        </div>
      </div>

      {/* Profile Card */}
      <div className="px-6 -mt-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h2 className="text-2xl font-bold text-dark">{userName}</h2>
                <button
                  onClick={() => setShowEditName(true)}
                  className="p-2 text-primary hover:bg-gray-100 rounded-full transition-colors"
                >
                  <MdEdit className="text-lg" />
                </button>
              </div>
              <p className="text-gray-500">Professional Driver</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            {profileStats.map((stat, index) => (
              <div key={index} className={`${stat.color} text-white p-3 rounded-xl text-center`}>
                <p className="text-xs opacity-90">{stat.label}</p>
                <p className="text-lg font-bold mt-1">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Options */}
      <div className="px-6 mt-6 space-y-3">
        <div className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaCar className="text-blue-500 text-xl" />
            </div>
            <div>
              <p className="font-semibold text-dark">Vehicle Details</p>
              <p className="text-sm text-gray-500">Add your vehicle information</p>
            </div>
          </div>
          <MdEdit className="text-gray-400 text-xl" />
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-full">
              <FaIdCard className="text-green-500 text-xl" />
            </div>
            <div>
              <p className="font-semibold text-dark">Documents</p>
              <p className="text-sm text-gray-500">License, RC, Insurance</p>
            </div>
          </div>
          <MdEdit className="text-gray-400 text-xl" />
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <FaPhone className="text-purple-500 text-xl" />
            </div>
            <div>
              <p className="font-semibold text-dark">Contact Info</p>
              <p className="text-sm text-gray-500">Update phone & email</p>
            </div>
          </div>
          <MdEdit className="text-gray-400 text-xl" />
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-gray-100 p-3 rounded-full">
              <MdSettings className="text-gray-500 text-xl" />
            </div>
            <div>
              <p className="font-semibold text-dark">Settings</p>
              <p className="text-sm text-gray-500">App preferences & sync</p>
            </div>
          </div>
          <MdEdit className="text-gray-400 text-xl" />
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-yellow-100 p-3 rounded-full">
              <MdInfo className="text-yellow-500 text-xl" />
            </div>
            <div>
              <p className="font-semibold text-dark">About</p>
              <p className="text-sm text-gray-500">Version 1.0.0</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white rounded-xl shadow-md p-4 flex items-center justify-center space-x-3 hover:bg-red-600 transition-all active:scale-95"
        >
          <MdLogout className="text-2xl" />
          <span className="font-semibold text-lg">Logout</span>
        </button>
      </div>

      {/* Edit Name Modal */}
      {showEditName && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-dark mb-4">Edit Name</h2>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none mb-4"
            />
            <div className="flex space-x-3">
              <button
                onClick={() => setShowEditName(false)}
                className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateName}
                className="flex-1 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
