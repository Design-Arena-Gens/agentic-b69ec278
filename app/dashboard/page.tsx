"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaHome, FaUsers, FaChartLine, FaHeartbeat, FaUserCircle } from "react-icons/fa";
import { MdSos, MdCalculate, MdGroup, MdHealthAndSafety, MdNotes, MdSmartToy, MdSync } from "react-icons/md";

export default function DashboardPage() {
  const [userName, setUserName] = useState("");
  const [syncing, setSyncing] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const router = useRouter();

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (!name) {
      router.push("/splash");
    } else {
      setUserName(name);
    }
  }, [router]);

  const features = [
    {
      id: "sos",
      title: "SOS Help",
      icon: <MdSos className="text-4xl" />,
      color: "bg-red-500",
      link: "/sos",
    },
    {
      id: "income",
      title: "Income & Expense",
      icon: <MdCalculate className="text-4xl" />,
      color: "bg-green-500",
      link: "/income",
    },
    {
      id: "community",
      title: "Community",
      icon: <MdGroup className="text-4xl" />,
      color: "bg-blue-500",
      link: "/community",
    },
    {
      id: "health",
      title: "Health",
      icon: <MdHealthAndSafety className="text-4xl" />,
      color: "bg-purple-500",
      link: "/health",
    },
    {
      id: "notes",
      title: "Notes",
      icon: <MdNotes className="text-4xl" />,
      color: "bg-yellow-500",
      link: "/notes",
    },
    {
      id: "ai",
      title: "AI Assistant",
      icon: <MdSmartToy className="text-4xl" />,
      color: "bg-pink-500",
      link: "/ai-assistant",
    },
  ];

  const bottomNavigation = [
    { id: "home", label: "Home", icon: <FaHome className="text-2xl" /> },
    { id: "community", label: "Community", icon: <FaUsers className="text-2xl" /> },
    { id: "earnings", label: "Earnings", icon: <FaChartLine className="text-2xl" /> },
    { id: "health", label: "Health", icon: <FaHeartbeat className="text-2xl" /> },
    { id: "profile", label: "Profile", icon: <FaUserCircle className="text-2xl" /> },
  ];

  return (
    <div className="min-h-screen bg-light pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Hello {userName} 👋</h1>
          {syncing && (
            <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-3 py-1 rounded-full">
              <MdSync className="animate-spin" />
              <span className="text-sm">Syncing...</span>
            </div>
          )}
        </div>

        {/* Daily Summary */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white bg-opacity-20 p-4 rounded-xl text-center">
            <p className="text-sm opacity-90">Today's Earnings</p>
            <p className="text-2xl font-bold">₹850</p>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-xl text-center">
            <p className="text-sm opacity-90">Expenses</p>
            <p className="text-2xl font-bold">₹320</p>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-xl text-center">
            <p className="text-sm opacity-90">Net</p>
            <p className="text-2xl font-bold">₹530</p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-dark mb-4">Quick Access</h2>
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature) => (
            <button
              key={feature.id}
              onClick={() => router.push(feature.link)}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-95 flex flex-col items-center space-y-3"
            >
              <div className={`${feature.color} text-white p-4 rounded-full`}>
                {feature.icon}
              </div>
              <span className="font-semibold text-dark text-center">{feature.title}</span>
            </button>
          ))}
        </div>

        {/* Reminders */}
        <div className="mt-6 bg-white p-4 rounded-2xl shadow-md">
          <h3 className="font-bold text-dark mb-3">Today's Reminders</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-3 p-2 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Vehicle servicing due in 3 days</span>
            </div>
            <div className="flex items-center space-x-3 p-2 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Insurance renewal next month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex justify-around items-center py-3">
          {bottomNavigation.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentPage(item.id);
                if (item.id === "community") router.push("/community");
                if (item.id === "earnings") router.push("/income");
                if (item.id === "health") router.push("/health");
                if (item.id === "profile") router.push("/profile");
              }}
              className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-colors ${
                currentPage === item.id ? "text-primary" : "text-gray-500"
              }`}
            >
              {item.icon}
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
