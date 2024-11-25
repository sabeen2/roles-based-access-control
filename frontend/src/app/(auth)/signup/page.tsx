"use client";

import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import {
  Mail,
  Lock,
  User,
  Command,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import { useForm } from "antd/es/form/Form";

const SignupPage = () => {
  const [signupForm] = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onFinish = (values: any) => {
    console.log("Form Values:", values);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 backdrop-blur-md bg-black/20 rounded-full border border-white/10 p-1.5">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <Command size={18} className="text-white animate-spin" />
          </div>
          <span className="text-white/90 pr-2">Auth Portal</span>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full relative">
          <div className="relative backdrop-blur-xl bg-black/40 rounded-2xl border border-white/10 p-6 sm:p-8 shadow-xl">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Create Account
              </h2>
              <p className="text-sm sm:text-base text-white/50">
                Fill in the details to create your account
              </p>
            </div>

            <Form
              layout="vertical"
              form={signupForm}
              onFinish={onFinish}
              className="space-y-3 sm:space-y-4"
            >
              <Form.Item
                name="fullName"
                rules={[
                  { required: true, message: "Please enter your full name!" },
                ]}
              >
                <input
                  placeholder="Full Name"
                  className="h-10 sm:h-12 px-3 sm:px-4 bg-transparent text-white placeholder:text-white/30 border-none w-full"
                  style={{
                    borderRadius: "8px",
                    backgroundColor: "rgba(255, 255, 255, 0.07)",
                  }}
                />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please enter your email!" },
                  { type: "email", message: "Enter a valid email!" },
                ]}
              >
                <input
                  type="email"
                  placeholder="Email Address"
                  className="h-10 sm:h-12 px-3 sm:px-4 bg-transparent text-white placeholder:text-white/30 border-none w-full"
                  style={{
                    borderRadius: "8px",
                    backgroundColor: "rgba(255, 255, 255, 0.07)",
                  }}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please enter your password!" },
                ]}
              >
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="h-10 sm:h-12 px-3 sm:px-4 bg-transparent text-white placeholder:text-white/30 border-none w-full pr-10"
                    style={{
                      borderRadius: "8px",
                      backgroundColor: "rgba(255, 255, 255, 0.07)",
                    }}
                  />
                  <div
                    className="absolute top-1/2 right-3 sm:right-4 transform -translate-y-1/2 cursor-pointer text-white/70"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </div>
                </div>
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="h-10 sm:h-12 px-3 sm:px-4 bg-transparent text-white placeholder:text-white/30 border-none w-full pr-10"
                    style={{
                      borderRadius: "8px",
                      backgroundColor: "rgba(255, 255, 255, 0.07)",
                    }}
                  />
                </div>
              </Form.Item>

              <Form.Item>
                <button
                  onClick={() => signupForm.submit()}
                  className="w-full flex items-center justify-center space-x-2 font-semibold text-gray-100"
                  style={{
                    height: "44px",
                    borderRadius: "8px",
                    background: "linear-gradient(to right, #3b82f6, #2563eb)",
                  }}
                >
                  <span>Create Account</span>
                  <ArrowRight size={18} />
                </button>
              </Form.Item>
            </Form>

            <div className="mt-4 sm:mt-6 text-center">
              <p className="text-xs sm:text-sm text-white/50">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-blue-400 hover:text-blue-300 font-medium"
                >
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
