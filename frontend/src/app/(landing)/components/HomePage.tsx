import React from "react";
import {
  Shield,
  Lock,
  Key,
  ArrowRight,
  ChevronRight,
  Command,
  Layers,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import paths from "@/utils/paths.utils";
import Features from "./Features";
import HomeNav from "./HomeNav";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/*  Navigation */}
      <HomeNav />

      {/* Hero Section  */}
      <div className="relative min-h-screen flex items-center">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black,transparent)]" />

        <div className="absolute right-0 top-0 w-1/2 h-screen bg-gradient-to-bl from-blue-500/5 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8 px-2">
              <div className="inline-flex items-center space-x-2 p-1 pl-2 pr-4 bg-white/5 rounded-full border border-white/10 text-xs sm:text-sm">
                <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-blue-500/10">
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-blue-400 animate-pulse" />
                </span>
                <span className="text-white/70">
                  New: Advanced Policy Engine v2.0
                </span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-6xl font-bold mb-4 sm:mb-6 tracking-tight text-white ">
                  Role based
                  <div className="relative inline-flex ml-3 bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
                    Access
                    <div className="absolute -right-6 sm:-right-8 -top-6 sm:-top-8">
                      <Command
                        size={24}
                        className="text-blue-500/50 animate-spin mt-2"
                      />
                    </div>
                  </div>
                  <span className="block mt-1">Control is Here</span>
                </h1>

                <p className="text-sm sm:text-lg text-white/70 max-w-md sm:max-w-xl">
                  This is an assignment for VRP security frontend developer
                  intern; it is fullstack application, with dynamic roles and
                  permissons for a demo admin panel.
                </p>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-4">
                <Link
                  href={paths.getAdminPanelPath()}
                  className="group relative px-2 sm:px-6 py-2 sm:py-3 bg-white text-black rounded-lg overflow-hidden"
                >
                  <span className="relative z-10 flex items-center font-medium  text-xs sm:text-sm">
                    Access Admin Panel
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-blue-100 to-white bg-[length:200%_100%] animate-shimmer" />
                </Link>

                <button className="relative px-5 sm:px-6 py-2 sm:py-3 rounded-lg overflow-hidden group border border-gray-600">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative text-xs sm:text-sm text-white/90 ">
                    Documentation
                  </span>
                </button>
              </div>
            </div>

            {/* Interactive Demo Card */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-2xl" />
              <div className="relative bg-black/40 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/10">
                <div className="flex items-center justify-between p-3 sm:p-4 border-b border-white/5">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    {["#FF5F57", "#FFBD2E", "#28CA41"].map((color, i) => (
                      <div
                        key={i}
                        className="w-2 sm:w-3 h-2 sm:h-3 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2 text-white/30 text-xs sm:text-sm">
                    <Command size={12} />
                    <span>access-control.config</span>
                  </div>
                </div>

                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-white/50">
                      <Layers size={16} />
                      <span>Policy Configuration</span>
                    </div>
                    <pre className="text-sm text-blue-300/90">
                      <code>{`{
  "policy": {
    "name": "engineering-prod",
    "type": "dynamic",
    "rules": [
      {
        "effect": "allow",
        "actions": ["deploy"],
        "resources": ["k8s:pods/*"],
        "conditions": {
          "env": "production",
          "team": "engineering"
        }
      }
    ],
    "ai_suggestions": true,
    "auto_remediation": true
  }
}`}</code>
                    </pre>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-sm text-white/70">
                        Policy Validation Passed
                      </span>
                    </div>
                    <button className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors">
                      Deploy →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <Features />
    </div>
  );
};

export default HomePage;
