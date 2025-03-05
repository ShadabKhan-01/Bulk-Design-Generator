"use client"

import { useState, useRef, useEffect } from "react";
// import  fabric from "fabric";
import { Canvas, FabricImage } from "fabric";
import { Upload, FileText, Download, PencilRuler } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DesignTools from "@/components/DesignTools";
import LayersCustomization from "@/components/LayersCustomization";

export default function BulkDesignApp() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [imageSrc, setImageSrc] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showDesignTools, setShowDesignTools] = useState(false);
  const [canvas, setcanvas] = useState(null)
  const canvasRef = useRef();

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, {
        width: 530,
        height: 330,
      });
      initCanvas.backgroundColor = "#fff"
      initCanvas.renderAll();

      setcanvas(initCanvas);

      return () => {
        initCanvas.dispose();
      };
    }

  }, []);


  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file.name);
      const url = URL.createObjectURL(file);
      setImageSrc(url);

      const imageElement = document.createElement("img")
      imageElement.src = url
      imageElement.onload = () => {

        const scale = Math.min(
          canvas.width/imageElement.width,
          canvas.height/imageElement.height
        )

        const image = new FabricImage(imageElement, {
          left: 0,
          top: 0,
          scaleX:scale,
          scaleY:scale
        });
        canvas.add(image);
        canvas.renderAll();
      }
    };
  };


  return (
    <div className={` ${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
      }`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className={`flex h-screen `}>
        {/* Sidebar */}
        <aside
          className={`w-1/4 bg-white/10 backdrop-blur-md p-4 shadow-md transition-transform duration-300 
          ${showDesignTools ? "-translate-x-full opacity-0 pointer-events-none" : "translate-x-0 opacity-100"}`}
        >
          <div>
            <h2 className="text-xl font-semibold mb-4">Design Options</h2>
            <button onClick={() => setShowDesignTools(true)} className="w-full mb-2 bg-white text-gray-900 hover:bg-gray-200 border rounded-lg py-2 px-4">
              Create New Design
            </button>
          </div>
          <label className="w-full flex items-center justify-center px-4 py-2 bg-white text-gray-900 border rounded-lg shadow-sm cursor-pointer">
            <Upload className="mr-2" /> Upload Template
            <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
          </label>
          {uploadedFile && <p className="text-sm mt-2">Uploaded: {uploadedFile}</p>}
        </aside>

        {/* Main Content */}
        <main className="flex flex-col p-6 transition-all duration-500 w-1/2">
          <div className="flex justify-evenly">
            <h1 className="text-4xl font-bold mb-4 inline-block">Bulk Design Generator</h1>
            <button
              onClick={() => setShowDesignTools(false)}
              className={`px-4 bg-white text-gray-900 border rounded-lg shadow-md my-1
              ${!showDesignTools && "hidden"}`}
            >Back to Options</button>
          </div>
          <div className="h-96 flex items-center justify-center bg-white/10 shadow-lg p-6 rounded-lg">
            <canvas ref={canvasRef} className="w-full h-full" />
          </div>
        </main>

        {/* Data Upload & Export Section */}
        <aside
          className={`w-1/4 bg-white/10 backdrop-blur-md p-4 shadow-md transition-transform duration-300 relative top-0 right-0 h-full 
          ${showDesignTools ? "translate-x-full opacity-0 hidden pointer-events-none" : "translate-x-0 opacity-100 block"}`}
        >
          <h2 className="text-xl font-semibold mb-4">Data & Export</h2>
          <label className="w-full flex items-center justify-center px-4 py-2 bg-white text-gray-900 border rounded-lg shadow-sm cursor-pointer">
            <FileText className="mr-2" /> Upload CSV
            <input type="file" className="hidden" />
          </label>
          <button className="w-full mt-4 bg-white text-gray-900 hover:bg-gray-200 border rounded-lg py-2 px-4 flex items-center justify-center">
            <Download className="mr-2" /> Export Designs
          </button>
        </aside>

        {/* New Design Tool Panels (Visible when designing) */}
        <DesignTools showDesignTools={showDesignTools} canvas={canvas} />

        <LayersCustomization showDesignTools={showDesignTools} canvas={canvas} />
      </div>
      <Footer darkMode={darkMode} />
    </div>
  );
}
