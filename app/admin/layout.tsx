"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Get user from normal login
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    
    console.log("Admin check - token:", !!token);
    console.log("Admin check - userStr:", userStr);
    
    if (!token || !userStr) {
      console.log("No token or user, redirecting to login");
      router.push("/login");
      return;
    }

    try {
      const user = JSON.parse(userStr);
      console.log("Admin check - user:", user);
      console.log("Admin check - isAdmin:", user.isAdmin);
      
      if (user.isAdmin === true) {
        console.log("User is admin, granting access");
        setIsAuthorized(true);
      } else {
        console.log("User is not admin, redirecting to dashboard");
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Error parsing user:", err);
      router.push("/login");
    }
  }, [router]);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  return <>{children}</>;
}