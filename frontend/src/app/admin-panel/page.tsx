"use client";
import React, { useState } from "react";
import {
  Users,
  BookOpen,
  Calendar,
  UserCog,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Menu,
  X,
} from "lucide-react";

const AdminPanel = () => {
  const [activeItem, setActiveItem] = useState("Author");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const sidebarItems = [
    {
      icon: BookOpen,
      label: "Author",
      count: "245",
      trend: "+12.5%",
      description: "Active Authors",
    },
    {
      icon: Users,
      label: "Reviews",
      count: "1,234",
      trend: "+8.2%",
      description: "Total Reviews",
    },
    {
      icon: Calendar,
      label: "Bookings",
      count: "89",
      trend: "+15.8%",
      description: `Today's Bookings`,
    },
    {
      icon: UserCog,
      label: "User Management",
      count: "562",
      trend: "+5.3%",
      description: "Active Users",
    },
  ];

  return (
    <div className="flex h-screen bg-slate-950">
      {/* Sidebar for larger screens */}
      <div
        className={`hidden lg:flex ${
          isSidebarCollapsed ? "w-20" : "w-72"
        } h-screen bg-slate-900/50 backdrop-blur-xl border-r border-slate-800 transition-all duration-300 flex-col`}
      >
        {/* Logo Area */}
        <div className="flex items-center h-20 px-6 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
              <LayoutGrid size={20} className="text-white" />
            </div>
            {!isSidebarCollapsed && (
              <div>
                <h1 className="text-white font-semibold">Enterprise</h1>
                <p className="text-xs text-slate-400">Administrative Portal</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex-1 px-4 py-6">
          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveItem(item.label)}
                className={`w-full flex items-center ${
                  isSidebarCollapsed ? "justify-center" : "justify-between"
                } p-4 rounded-xl transition-all duration-200 group ${
                  activeItem === item.label
                    ? "bg-gradient-to-r from-indigo-500/10 to-indigo-500/5 text-indigo-400"
                    : "text-slate-400 hover:bg-slate-800/50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-lg ${
                      activeItem === item.label
                        ? "bg-indigo-500/20"
                        : "bg-slate-800/50"
                    }`}
                  >
                    <item.icon size={18} />
                  </div>
                  {!isSidebarCollapsed && <span>{item.label}</span>}
                </div>
                {!isSidebarCollapsed && activeItem === item.label && (
                  <ChevronRight size={16} className="text-indigo-400" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="w-full p-3 rounded-xl bg-slate-800/50 text-slate-400 hover:text-white transition-colors flex items-center justify-center"
          >
            <ChevronLeft
              className={`transform transition-transform ${
                isSidebarCollapsed ? "rotate-180" : ""
              }`}
              size={20}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="lg:hidden fixed top-4 left-4 p-3 rounded-full bg-indigo-500 text-white shadow-lg z-50 hover:bg-indigo-600 transition-colors"
      >
        <Menu size={20} />
      </button>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Drawer Content */}
          <div className="absolute inset-y-0 left-0 w-72 bg-slate-900 shadow-xl transform transition-transform duration-300">
            {/* Drawer Header */}
            <div className="h-20 px-6 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
                  <LayoutGrid size={20} className="text-white" />
                </div>
                <div>
                  <h1 className="text-white font-semibold">Enterprise</h1>
                  <p className="text-xs text-slate-400">
                    Administrative Portal
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:bg-slate-800/50"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Navigation */}
            <div className="p-4">
              <div className="space-y-2">
                {sidebarItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      setActiveItem(item.label);
                      setIsDrawerOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
                      activeItem === item.label
                        ? "bg-gradient-to-r from-indigo-500/10 to-indigo-500/5 text-indigo-400"
                        : "text-slate-400 hover:bg-slate-800/50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg ${
                          activeItem === item.label
                            ? "bg-indigo-500/20"
                            : "bg-slate-800/50"
                        }`}
                      >
                        <item.icon size={18} />
                      </div>
                      <span>{item.label}</span>
                    </div>
                    {activeItem === item.label && (
                      <ChevronRight size={16} className="text-indigo-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl">
          <div className="h-full px-8 flex items-center justify-end">
            <div className="flex items-center space-x-5">
              <div className="flex items-center space-x-3 pl-5 border-l border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center">
                  <span className="text-white font-medium">JD</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <div className=" mx-auto">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Dashboard
            </h2>

            {/* Stats Grid */}
            <div className="text-white">Hello</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
