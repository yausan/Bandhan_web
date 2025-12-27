"use client";

import { RegisterForm } from "@/components/forms/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side gradient / illustration */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-500 to-purple-600 text-white items-center justify-center p-12">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold mb-6">Welcome to Bandhan</h1>
          <p className="text-lg">
            Create your account and connect securely with Bandhan.
          </p>
        </div>
      </div>

      {/* Right side form */}
      <div className="flex flex-1 justify-center items-center bg-gray-50 p-8">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">
          <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
            Create a Bandhan Account
          </h2>

          {/* Register form component */}
          <RegisterForm />

          <p className="mt-6 text-center text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-600 font-semibold hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
