import paths from "@/utils/paths.utils";
import Link from "next/link";
import React from "react";

const HomeNav = () => {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 backdrop-blur-md bg-black/20 rounded-full border border-white/10 p-1.5">
      <div className="flex items-center space-x-1 sm:space-x-2">
        {["Homepage", "Features", "Documentation"].map((item, i) => (
          <button
            key={i}
            className={`px-3 sm:px-4 py-1 text-xs sm:text-sm rounded-full transition-colors ${
              i === 0
                ? "bg-white text-black"
                : "text-white/70 hover:text-white hover:bg-white/5"
            }`}
          >
            <Link href={`#${item.toLowerCase()}`}> {item} </Link>
          </button>
        ))}
        <button
          className={`px-3 sm:px-4 py-1 text-xs sm:text-sm rounded-full transition-colors 
         bg-blue-700 text-white animate-pulse hidden lg:block  "
            `}
        >
          <Link href={paths.getAdminPanelPath()}> Admin Panel </Link>
        </button>
      </div>
    </nav>
  );
};

export default HomeNav;
