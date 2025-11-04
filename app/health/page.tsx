"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdArrowBack, MdLocalHospital, MdFitnessCenter, MdWaterDrop, MdBedtime } from "react-icons/md";
import { FaHeartbeat, FaRunning } from "react-icons/fa";

export default function HealthPage() {
  const router = useRouter();
  const [waterIntake, setWaterIntake] = useState(5);
  const [sleepHours, setSleepHours] = useState(6);
  const [exerciseMinutes, setExerciseMinutes] = useState(20);

  const healthTips = [
    "Take a 5-minute break every 2 hours of driving",
    "Keep yourself hydrated - drink at least 8 glasses of water daily",
    "Do simple stretching exercises during breaks",
    "Maintain proper sitting posture while driving",
    "Get at least 7-8 hours of sleep daily",
  ];

  return (
    <div className="min-h-screen bg-light pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 shadow-lg">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <MdArrowBack className="text-2xl" />
          </button>
          <h1 className="text-2xl font-bold">Health & Wellness</h1>
        </div>
        <p className="mt-2 text-sm opacity-90">Track your daily health metrics</p>
      </div>

      {/* Health Stats */}
      <div className="px-6 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-5 rounded-xl shadow-md">
            <MdWaterDrop className="text-3xl mb-2" />
            <p className="text-sm opacity-90">Water Intake</p>
            <p className="text-2xl font-bold">{waterIntake}/8 glasses</p>
            <div className="mt-3 bg-white bg-opacity-30 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all"
                style={{ width: `${(waterIntake / 8) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-400 to-purple-600 text-white p-5 rounded-xl shadow-md">
            <MdBedtime className="text-3xl mb-2" />
            <p className="text-sm opacity-90">Sleep</p>
            <p className="text-2xl font-bold">{sleepHours}/8 hours</p>
            <div className="mt-3 bg-white bg-opacity-30 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all"
                style={{ width: `${(sleepHours / 8) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-400 to-green-600 text-white p-5 rounded-xl shadow-md">
            <FaRunning className="text-3xl mb-2" />
            <p className="text-sm opacity-90">Exercise</p>
            <p className="text-2xl font-bold">{exerciseMinutes}/30 min</p>
            <div className="mt-3 bg-white bg-opacity-30 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all"
                style={{ width: `${(exerciseMinutes / 30) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-400 to-red-600 text-white p-5 rounded-xl shadow-md">
            <FaHeartbeat className="text-3xl mb-2" />
            <p className="text-sm opacity-90">Heart Rate</p>
            <p className="text-2xl font-bold">72 bpm</p>
            <p className="text-xs mt-2 opacity-75">Normal range</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mt-6">
        <h2 className="text-lg font-bold text-dark mb-3">Quick Actions</h2>
        <div className="space-y-3">
          <button
            onClick={() => setWaterIntake(Math.min(waterIntake + 1, 8))}
            className="w-full bg-white p-4 rounded-xl shadow-md flex items-center justify-between hover:shadow-lg transition-all active:scale-95"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <MdWaterDrop className="text-blue-500 text-2xl" />
              </div>
              <span className="font-semibold text-dark">Add Water Glass</span>
            </div>
            <span className="text-2xl">+</span>
          </button>

          <button
            onClick={() => setExerciseMinutes(Math.min(exerciseMinutes + 10, 60))}
            className="w-full bg-white p-4 rounded-xl shadow-md flex items-center justify-between hover:shadow-lg transition-all active:scale-95"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <MdFitnessCenter className="text-green-500 text-2xl" />
              </div>
              <span className="font-semibold text-dark">Log Exercise (10 min)</span>
            </div>
            <span className="text-2xl">+</span>
          </button>
        </div>
      </div>

      {/* Health Tips */}
      <div className="px-6 mt-6">
        <h2 className="text-lg font-bold text-dark mb-3">Health Tips for Drivers</h2>
        <div className="bg-white p-5 rounded-xl shadow-md space-y-3">
          {healthTips.map((tip, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">{index + 1}</span>
              </div>
              <p className="text-gray-700 text-sm">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="px-6 mt-6">
        <h2 className="text-lg font-bold text-dark mb-3">Health Emergency</h2>
        <a
          href="tel:108"
          className="w-full bg-red-500 text-white p-5 rounded-xl shadow-md flex items-center justify-center space-x-3 hover:bg-red-600 transition-all active:scale-95"
        >
          <MdLocalHospital className="text-3xl" />
          <div className="text-left">
            <p className="font-semibold text-lg">Call Ambulance</p>
            <p className="text-sm opacity-90">108 - Emergency Services</p>
          </div>
        </a>
      </div>
    </div>
  );
}
