"use client";

import { LoginForm } from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side illustration / color */}
      <div className="hidden md:flex md:w-1/2 bg-linear-to-br from-indigo-500 to-purple-600 text-white items-center justify-center p-12">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold mb-6">Welcome to Bandhan</h1>
          <p className="text-lg">
            Secure connections. Smart interface. Simple design.
          </p>
        </div>
      </div>

      {/* Right side form */}
      <div className="flex flex-1 justify-center items-center bg-gray-50 p-8">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">
          <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">Login to Bandhan</h2>
          
          <LoginForm />

          <p className="mt-6 text-center text-gray-500">
            Don't have an account?{" "}
            <a href="/register" className="text-indigo-600 font-semibold hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
