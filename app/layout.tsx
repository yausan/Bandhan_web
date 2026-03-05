import React from "react";
import "./globals.css";
import Link from "next/link";
import { HeartHandshake } from "lucide-react";

export const metadata = {
  title: "Bandhan – Find Your Life Partner",
  description: "Bandhan – Nepal's most trusted matrimony platform for meaningful connections and lifelong relationships",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-linear-to-br from-pink-50 via-white to-rose-50 text-gray-900">
        {/* Navbar completely removed */}
        
        <main>{children}</main>
        
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <HeartHandshake className="h-6 w-6 text-pink-400" />
                  <h3 className="text-xl font-bold">Bandhan</h3>
                </div>
                <p className="text-gray-400">Nepal's most trusted matrimony platform helping couples find their perfect life partner since 2020.</p>
                <div className="flex space-x-4 mt-4">
                  <span className="text-pink-400 text-sm">25K+ Weddings</span>
                  <span className="text-gray-600">|</span>
                  <span className="text-pink-400 text-sm">50K+ Couples</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 text-pink-400">Quick Links</h4>
                <ul className="space-y-2">
                  <li><Link href="/about" className="text-gray-400 hover:text-white transition">About Us</Link></li>
                  <li><Link href="/success-stories" className="text-gray-400 hover:text-white transition">Success Stories</Link></li>
                  <li><Link href="/how-it-works" className="text-gray-400 hover:text-white transition">How It Works</Link></li>
                  <li><Link href="/faq" className="text-gray-400 hover:text-white transition">FAQ</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 text-pink-400">Support</h4>
                <ul className="space-y-2">
                  <li><Link href="/contact" className="text-gray-400 hover:text-white transition">Contact Us</Link></li>
                  <li><Link href="/help" className="text-gray-400 hover:text-white transition">Help Center</Link></li>
                  <li><Link href="/safety" className="text-gray-400 hover:text-white transition">Safety Tips</Link></li>
                  <li><Link href="/trust" className="text-gray-400 hover:text-white transition">Trust & Safety</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 text-pink-400">Legal</h4>
                <ul className="space-y-2">
                  <li><Link href="/terms" className="text-gray-400 hover:text-white transition">Terms of Service</Link></li>
                  <li><Link href="/privacy" className="text-gray-400 hover:text-white transition">Privacy Policy</Link></li>
                  <li><Link href="/refund" className="text-gray-400 hover:text-white transition">Refund Policy</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm">© 2025 Bandhan Matrimony. All rights reserved.</p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <span className="text-gray-500 text-sm">Made with ❤️ for lasting unions</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}