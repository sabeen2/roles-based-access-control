"use client";
import React, { useState } from "react";
import {
  Users,
  BookOpen,
  Calendar,
  UserCog,
  ChevronLeft,
  Search,
  Bell,
  Settings,
  LayoutGrid,
  ChevronRight,
  Plus,
  Filter,
  MoreHorizontal,
  TrendingUp,
  ArrowUpRight,
  Activity,
} from "lucide-react";

const AdminPanel = () => {
  const [activeItem, setActiveItem] = useState("Author");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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
    <div className="flex h-screen bg-gradient-to-br from-[#0A0A0A] to-[#1a1a1a]">
      {/* Sidebar */}
      <div
        className={`relative ${
          isSidebarCollapsed ? "w-20" : "w-72"
        } h-screen bg-black/40 backdrop-blur-xl border-r border-white/5 transition-all duration-300 flex flex-col`}
      >
        {/* Logo Area */}
        <div className="flex items-center h-20 px-6 border-b border-white/5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <LayoutGrid size={20} className="text-white" />
            </div>
            {!isSidebarCollapsed && (
              <div>
                <h1 className="text-white font-semibold">Enterprise</h1>
                <p className="text-xs text-white/50">Administrative Portal</p>
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
                    ? "bg-gradient-to-r from-blue-500/10 to-blue-500/5 text-blue-400"
                    : "text-white/70 hover:bg-white/5"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-lg ${
                      activeItem === item.label
                        ? "bg-blue-500/20"
                        : "bg-white/5"
                    }`}
                  >
                    <item.icon size={18} />
                  </div>
                  {!isSidebarCollapsed && <span>{item.label}</span>}
                </div>
                {!isSidebarCollapsed && activeItem === item.label && (
                  <ChevronRight size={16} className="text-blue-400" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="w-full p-3 rounded-xl bg-gradient-to-r from-white/5 to-white/0 text-white/70 hover:text-white transition-colors flex items-center justify-center"
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b border-white/5 bg-black/20 backdrop-blur-xl">
          <div className="h-full px-8 flex items-center justify-between">
            <div className="flex items-center flex-1 space-x-6">
              <div className="relative max-w-md w-full">
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-2.5 pl-12 text-white/70 placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                />
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/30"
                  size={18}
                />
              </div>
              <button className="px-4 py-2.5 rounded-xl border border-white/10 text-white/70 hover:bg-white/5 transition-colors flex items-center space-x-2">
                <Filter size={18} />
                <span className="text-sm">Filters</span>
              </button>
            </div>
            <div className="flex items-center space-x-5">
              <button className="relative p-2.5 rounded-xl bg-white/5 text-white/70 hover:bg-white/10 transition-colors">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full ring-4 ring-black"></span>
              </button>
              <button className="p-2.5 rounded-xl bg-white/5 text-white/70 hover:bg-white/10 transition-colors">
                <Settings size={20} />
              </button>
              <div className="flex items-center space-x-3 pl-5 border-l border-white/10">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
                  <span className="text-white font-medium">JD</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Page Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {activeItem} Dashboard
                </h1>
                <div className="flex items-center space-x-2 text-white/50">
                  <span className="text-sm">Analytics and overview</span>
                  <span className="text-white/30">•</span>
                  <span className="text-sm text-blue-400">Last 30 days</span>
                </div>
              </div>
              <button className="px-5 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white flex items-center space-x-2 shadow-lg shadow-blue-500/20 transition-colors">
                <Plus size={20} />
                <span>Add New {activeItem}</span>
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {sidebarItems.map((stat, index) => (
                <div
                  key={index}
                  className="group relative rounded-xl p-px overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative h-full bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 rounded-xl bg-white/5">
                        <stat.icon size={20} className="text-blue-400" />
                      </div>
                      <div className="flex items-center space-x-1 text-emerald-400 text-sm">
                        <ArrowUpRight size={16} />
                        <span>{stat.trend}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold text-white">
                        {stat.count}
                      </h3>
                      <p className="text-sm text-white/50">
                        {stat.description}
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-sm text-white/70">
                        View details
                      </span>
                      <ChevronRight size={16} className="text-white/30" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content Card */}
              <div className="lg:col-span-2 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-white">
                    Activity Overview
                  </h2>
                  <button className="p-2 rounded-lg hover:bg-white/5 text-white/50">
                    <MoreHorizontal size={20} />
                  </button>
                </div>
                <div className="h-64 flex items-center justify-center text-white/20 border-2 border-dashed border-white/10 rounded-xl">
                  Chart Area
                </div>
              </div>

              {/* Side Card */}
              <div className="rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-white">
                    Recent Activity
                  </h2>
                  <button className="p-2 rounded-lg hover:bg-white/5 text-white/50">
                    <Activity size={20} />
                  </button>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                          <TrendingUp size={20} className="text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-white">
                            Activity {i}
                          </h3>
                          <p className="text-xs text-white/50">2 minutes ago</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
