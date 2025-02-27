"use client"

import { useState } from "react";
import { Upload, FileText, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BulkDesignApp() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) setUploadedFile(file.name);
  };

  return (
    <div className={` ${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
        }`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className={`flex h-screen `}>
        {/* Sidebar */}
        <aside className="w-1/4 bg-white/10 backdrop-blur-md p-4 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Design Options</h2>
          <button className="w-full mb-2 bg-white text-gray-900 hover:bg-gray-200 border rounded-lg py-2 px-4">
            Create New Design
          </button>
          <label className="w-full flex items-center justify-center px-4 py-2 bg-white text-gray-900 border rounded-lg shadow-sm cursor-pointer">
            <Upload className="mr-2" /> Upload Template
            <input type="file" className="hidden" onChange={handleFileUpload} />
          </label>
          {uploadedFile && <p className="text-sm mt-2">Uploaded: {uploadedFile}</p>}
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col p-6">
          <h1 className="text-4xl font-bold mb-4">Bulk Design Generator</h1>
          <div className="h-96 flex items-center justify-center bg-white/10 shadow-lg p-6 rounded-lg">
            <p className="text-gray-200">Canvas Area (Fabric.js will be integrated here)</p>
          </div>
        </main>

        {/* Data Upload & Export Section */}
        <aside className="w-1/4 bg-white/10 backdrop-blur-md p-4 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Data & Export</h2>
          <label className="w-full flex items-center justify-center px-4 py-2 bg-white text-gray-900 border rounded-lg shadow-sm cursor-pointer">
            <FileText className="mr-2" /> Upload CSV
            <input type="file" className="hidden" />
          </label>
          <button className="w-full mt-4 bg-white text-gray-900 hover:bg-gray-200 border rounded-lg py-2 px-4 flex items-center justify-center">
            <Download className="mr-2" /> Export Designs
          </button>
        </aside>
      </div>
      <Footer darkMode={darkMode} />
    </div>
  );
}
