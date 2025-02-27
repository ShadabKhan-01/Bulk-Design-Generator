"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-between ${
        darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
      }`}
    >
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Main Content */}
      <main className="flex flex-col items-center text-center flex-grow p-4">
        <h1 className="text-5xl font-bold mb-4">Bulk Design Generator</h1>
        <p className="text-lg mb-6 max-w-xl">
          Create, personalize, and export bulk designs effortlessly. Upload your template, provide the data, and let our
          tool generate multiple copies instantly.
        </p>
        <button className="px-6 py-3 text-lg font-semibold bg-white text-gray-900 rounded-lg shadow-lg hover:bg-gray-200 transition flex items-center">
          <Link href={'/dashboard'}>
          Get Started<ArrowRight className="ml-2" /></Link>
        </button>
      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
}
