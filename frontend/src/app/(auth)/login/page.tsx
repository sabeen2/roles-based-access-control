"use client";
import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { ArrowRight, Command } from "lucide-react";
import { useForm } from "antd/es/form/Form";
import { useUserLogin } from "@/api/userAuth/queries";
import { useRouter } from "next/navigation";
import paths from "@/utils/paths.utils";

const LoginPage = () => {
  const [loginForm] = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { mutate: loginUser, isPending: isLoggingIn } = useUserLogin();

  const onFinish = (values: any) => {
    let payload = {
      email: values.email,
      password: values.password,
    };
    loginUser(payload, {
      onSuccess: () => {
        message.success(`User Logged in Sucessfully`);
        router.push(paths.getAdminPanelPath());
      },
      onError: (err) => {
        message.error(`Failed ${err}`);
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 backdrop-blur-md bg-black/20 rounded-full border border-white/10 p-1.5">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <Command
              style={{ color: "white", fontSize: 18 }}
              className="animate-spin"
            />
          </div>
          <span className="text-white/90 pr-2">Auth Portal</span>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full relative">
          <div className="relative backdrop-blur-xl bg-black/40 rounded-2xl border border-white/10 p-6 sm:p-8 shadow-xl">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Welcome Back
              </h2>
              <p className="text-sm sm:text-base text-white/50">
                Enter your credentials to access your account
              </p>
            </div>

            <Form
              form={loginForm}
              onFinish={onFinish}
              className="space-y-4 sm:space-y-6"
              layout="vertical"
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please enter your email!" },
                  { type: "email", message: "Enter a valid email!" },
                ]}
              >
                <input
                  placeholder="Email Address"
                  className="bg-transparent text-white placeholder:text-white/30 placeholder:text-white w-full px-4"
                  style={{
                    height: "44px",
                    borderRadius: "10px",
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
                    className="bg-transparent text-white placeholder:text-white/30 w-full px-4"
                    style={{
                      height: "44px",
                      borderRadius: "10px",
                      backgroundColor: "rgba(255, 255, 255, 0.07)",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white/50 hover:text-white"
                  >
                    {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                  </button>
                </div>
              </Form.Item>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-xs sm:text-sm text-blue-400 hover:text-blue-300"
                >
                  Forgot Password?
                </button>
              </div>

              <Form.Item>
                <button
                  disabled={isLoggingIn}
                  // onClick={() => loginForm.submit()}
                  className="w-full h-10 sm:h-12 rounded-xl flex items-center justify-center space-x-2 font-semibold text-gray-100"
                  style={{
                    background: "linear-gradient(to right, #3b82f6, #2563eb)",
                    border: "none",
                  }}
                >
                  <span>Login</span>
                  <ArrowRight size={18} />
                </button>
              </Form.Item>
            </Form>

            <div className="mt-4 sm:mt-6 text-center">
              <p className="text-xs sm:text-sm text-white/50">
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="text-blue-400 hover:text-blue-300 font-medium"
                >
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
