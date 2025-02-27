import { useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className={`w-full flex justify-between items-center p-4 shadow-md relative z-10 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white bg-opacity-10 backdrop-blur-md text-white"
      }`}
    >
      <h2 className="text-2xl font-bold"><Link href={'/'}>BulkDesign</Link></h2>
      <div className="hidden md:flex space-x-4">
        <button className="px-4 py-2 text-white hover:underline">Home</button>
        <button className="px-4 py-2 text-white hover:underline">About</button>
        <button className="px-4 py-2 text-white hover:underline">Contact</button>
        <button className="ml-2 px-4 py-2 bg-white text-gray-900 rounded-lg shadow-lg hover:bg-gray-200 transition">
          Login
        </button>
        <button className="ml-2 px-4 py-2 bg-white text-gray-900 rounded-lg shadow-lg hover:bg-gray-200 transition">
          Sign Up
        </button>
        <button onClick={() => setDarkMode(!darkMode)} className="ml-4 p-2 rounded-full">
          {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-900" />}
        </button>
      </div>
      {/* Hamburger Menu */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setMenuOpen(!menuOpen)} className="p-2">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {/* Mobile Menu */}
      <div
        className={`absolute top-full left-0 w-full transition-transform duration-300 ${menuOpen ? "translate-y-0" : "-translate-y-full invisible"} md:hidden bg-opacity-95 ${darkMode ? "bg-gray-900" : "bg-gradient-to-r from-blue-500 to-purple-600"}`}
      >
        <div className="flex flex-col items-center p-4 space-y-4">
          <button className="px-4 py-2 text-white hover:underline">Home</button>
          <button className="px-4 py-2 text-white hover:underline">About</button>
          <button className="px-4 py-2 text-white hover:underline">Contact</button>
          <button className="px-4 py-2 bg-white text-gray-900 rounded-lg shadow-lg hover:bg-gray-200 transition">
            Login
          </button>
          <button className="px-4 py-2 bg-white text-gray-900 rounded-lg shadow-lg hover:bg-gray-200 transition">
            Sign Up
          </button>
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full">
            {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-900" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
