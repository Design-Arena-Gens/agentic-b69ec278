"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MdSos, MdLocationOn, MdPhone, MdArrowBack } from "react-icons/md";
import { FaAmbulance, FaPhoneAlt } from "react-icons/fa";

interface NearbyDriver {
  id: number;
  name: string;
  distance: string;
  phone: string;
}

export default function SOSPage() {
  const router = useRouter();
  const [sosActive, setSosActive] = useState(false);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [nearbyDrivers, setNearbyDrivers] = useState<NearbyDriver[]>([
    { id: 1, name: "Rajesh Kumar", distance: "0.5 km", phone: "+91 98765 43210" },
    { id: 2, name: "Amit Singh", distance: "1.2 km", phone: "+91 98765 43211" },
    { id: 3, name: "Vikram Patel", distance: "1.8 km", phone: "+91 98765 43212" },
  ]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  const handleSOSClick = () => {
    setSosActive(!sosActive);
    if (!sosActive) {
      // Send SOS alert to nearby drivers
      alert("SOS Alert Sent! Nearby drivers have been notified.");
    }
  };

  return (
    <div className="min-h-screen bg-light">
      {/* Header */}
      <div className="bg-red-500 text-white p-6 shadow-lg">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <MdArrowBack className="text-2xl" />
          </button>
          <h1 className="text-2xl font-bold">Emergency SOS</h1>
        </div>
      </div>

      {/* SOS Button */}
      <div className="flex flex-col items-center justify-center py-12">
        <button
          onClick={handleSOSClick}
          className={`relative w-48 h-48 rounded-full shadow-2xl transition-all active:scale-95 ${
            sosActive
              ? "bg-red-600 animate-pulse"
              : "bg-gradient-to-br from-red-500 to-red-700"
          }`}
        >
          <div className="flex flex-col items-center justify-center text-white">
            <MdSos className="text-6xl mb-2" />
            <span className="text-2xl font-bold">{sosActive ? "SOS ACTIVE" : "PRESS SOS"}</span>
          </div>
          {sosActive && (
            <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping"></div>
          )}
        </button>
        <p className="mt-6 text-gray-600 text-center px-6">
          {sosActive
            ? "Help is on the way! Nearby drivers have been notified."
            : "Press the button in case of emergency"}
        </p>
      </div>

      {/* Emergency Contacts */}
      <div className="px-6 mb-6">
        <h2 className="text-xl font-bold text-dark mb-4">Emergency Contacts</h2>
        <div className="space-y-3">
          <a
            href="tel:100"
            className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-red-100 p-3 rounded-full">
                <FaPhoneAlt className="text-red-500 text-xl" />
              </div>
              <div>
                <p className="font-semibold">Police</p>
                <p className="text-sm text-gray-500">100</p>
              </div>
            </div>
            <MdPhone className="text-2xl text-gray-400" />
          </a>

          <a
            href="tel:108"
            className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FaAmbulance className="text-blue-500 text-xl" />
              </div>
              <div>
                <p className="font-semibold">Ambulance</p>
                <p className="text-sm text-gray-500">108</p>
              </div>
            </div>
            <MdPhone className="text-2xl text-gray-400" />
          </a>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="px-6 mb-6">
        <h2 className="text-xl font-bold text-dark mb-4">Your Location</h2>
        <div className="bg-gray-200 rounded-xl h-48 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-blue-400 opacity-50"></div>
          <div className="relative z-10 text-center">
            <MdLocationOn className="text-5xl text-red-500 mx-auto mb-2" />
            <p className="text-sm text-gray-700">
              Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Google Maps integration available
            </p>
          </div>
        </div>
      </div>

      {/* Nearby Drivers */}
      <div className="px-6 pb-6">
        <h2 className="text-xl font-bold text-dark mb-4">Nearby Drivers</h2>
        <div className="space-y-3">
          {nearbyDrivers.map((driver) => (
            <div
              key={driver.id}
              className="bg-white p-4 rounded-xl shadow-md flex items-center justify-between"
            >
              <div>
                <p className="font-semibold text-dark">{driver.name}</p>
                <p className="text-sm text-gray-500">{driver.distance} away</p>
              </div>
              <a
                href={`tel:${driver.phone}`}
                className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-colors"
              >
                <FaPhoneAlt className="text-lg" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
