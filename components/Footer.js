export default function Footer({ darkMode }) {
    return (
      <footer
        className={`w-full p-4 text-center text-sm ${
          darkMode ? "bg-gray-800 text-white" : "bg-white bg-opacity-10 backdrop-blur-md text-white"
        }`}
      >
        © 2025 BulkDesign. All rights reserved.
      </footer>
    );
  }
  