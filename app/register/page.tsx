"use client";

import { useState } from "react";
import { Shield, Users, Lock, Sparkles, Heart, Gem, CircleDot, HeartHandshake } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phoneNumber
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      // Save token
      localStorage.setItem("token", data.token);

      setLoading(false);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Animated left side */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-linear-to-br from-rose-500 via-pink-500 to-red-500">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute text-pink-200 opacity-20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 5}s`,
                fontSize: `${20 + Math.random() * 30}px`
              }}
            >
              ❤️
            </div>
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
          <div className="max-w-md text-center">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-lg animate-float">
                <HeartHandshake className="w-16 h-16" />
              </div>
            </div>

            <h1 className="text-5xl font-extrabold mb-6 animate-fade-in">
              Join
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-yellow-200 to-pink-200">
                Bandhan
              </span>
            </h1>

            <p className="text-xl mb-12 text-pink-100">
              Start your journey to find your perfect life partner
            </p>

            <div className="space-y-4 text-left">
              {[
                { icon: Heart, text: "Connect with like-minded singles" },
                { icon: Gem, text: "Premium matches based on compatibility" },
                { icon: CircleDot, text: "Join 50,000+ successful couples" },
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition transform hover:scale-105"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <feature.icon className="w-5 h-5 text-yellow-200" />
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <p className="text-lg font-semibold">Start Your Journey Today</p>
              <p className="text-sm text-pink-200">Join thousands of happy couples</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-linear-to-br from-pink-50 to-rose-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl p-8 transform transition-all duration-500 hover:shadow-3xl border border-pink-100">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-linear-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-2">
                <span className="bg-linear-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  Create Account
                </span>
              </h2>
              <p className="text-gray-500">Join Bandhan to find your perfect match</p>
            </div>

            <div className="space-y-3 mb-6">
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-pink-200 rounded-xl hover:bg-pink-50 transition group">
                <Image src="/google.svg" alt="Google" width={20} height={20} />
                <span className="text-gray-700 group-hover:text-pink-600">Sign up with Google</span>
              </button>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-pink-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-pink-400">Or sign up with email</span>
              </div>
            </div>

            {/* Register Form */}
            <form onSubmit={handleRegister} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-lg hover:from-pink-700 hover:to-rose-700 transition disabled:opacity-50 font-semibold"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
              
              {error && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                  {error}
                </div>
              )}
            </form>

            <p className="mt-8 text-center text-gray-600">
              Already have an account?{" "}
              <Link 
                href="/login" 
                className="text-pink-600 font-semibold hover:text-pink-700 transition relative group"
              >
                Sign in
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
              </Link>
            </p>

            <div className="flex justify-center items-center space-x-4 mt-6 pt-6 border-t border-pink-100">
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4 text-pink-400" />
                <span className="text-xs text-gray-500">Secure</span>
              </div>
              <div className="flex items-center space-x-1">
                <Lock className="w-4 h-4 text-pink-400" />
                <span className="text-xs text-gray-500">Private</span>
              </div>
              <div className="flex items-center space-x-1">
                <Gem className="w-4 h-4 text-pink-400" />
                <span className="text-xs text-gray-500">Free</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}