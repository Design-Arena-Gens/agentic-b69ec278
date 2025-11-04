"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaCar } from "react-icons/fa";

export default function SplashPage() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      localStorage.setItem("userName", name.trim());
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-accent to-secondary p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-primary rounded-full mb-4 shadow-lg">
            <FaCar className="text-white text-5xl" />
          </div>
          <h1 className="text-4xl font-bold text-dark mb-2">Driver Helper</h1>
          <p className="text-gray-600">Your Ultimate Driving Companion</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Enter Your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors text-lg"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-4 rounded-xl font-semibold text-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl active:scale-95"
          >
            Get Started
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Made for Indian Drivers 🇮🇳</p>
        </div>
      </div>
    </div>
  );
}
