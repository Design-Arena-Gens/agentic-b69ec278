"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const userName = localStorage.getItem("userName");

    if (userName) {
      router.push("/dashboard");
    } else {
      router.push("/splash");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
      <div className="text-white text-2xl">Loading...</div>
    </div>
  );
}
