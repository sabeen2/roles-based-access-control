import { Key, Lock, Shield } from "lucide-react";
import React from "react";

const Features = () => {
  return (
    <div>
      {/* Features Section */}
      <div id="features" className="relative px-4 sm:px-6 py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-blue-950/5 to-black/0" />

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Shield,
                title: "Role-Based Security",
                description:
                  "Define roles with specific permissions to control access to different parts of your application.",
                color: "from-blue-400/10 to-blue-600/10",
              },
              {
                icon: Lock,
                title: "User Management",
                description:
                  "Easily assign and manage roles for users, keeping your organization secure and efficient.",
                color: "from-purple-400/10 to-purple-600/10",
              },
              {
                icon: Key,
                title: "Permission Control",
                description:
                  "Granular permission settings allow you to define exactly what each role can access and modify.",
                color: "from-emerald-400/10 to-emerald-600/10",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative rounded-xl p-1 transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${feature.color} rounded-xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity`}
                />

                <div className="relative h-full bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 p-4 sm:p-6">
                  <feature.icon
                    className="text-white/80 mb-3 sm:mb-4"
                    size={20}
                  />
                  <h3 className="text-lg sm:text-xl text-white font-semibold mb-1 sm:mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-white/70">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
