"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Heart, Users, MessageCircle, Award, HeartHandshake,
  MapPin, Briefcase, Search, Bell, ChevronDown, LogOut, Gem, Check
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Create axios instance with token
const api = axios.create({
  baseURL: "http://localhost:5001",
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface Match {
  id: string;
  name: string;
  age: number;
  location: string;
  occupation: string;
  interests: string[];
  compatibility: number;
  isOnline: boolean;
  profilePicture?: string;
}

interface Message {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
}

interface Discovery {
  id: string;
  name: string;
  age: number;
  location: string;
  occupation: string;
  interests: string[];
  isOnline: boolean;
  profilePicture?: string;
  isInterested?: boolean;
}

interface Stats {
  profileViews: number;
  matches: number;
  messages: number;
  compatibilityScore: number;
}

interface Notification {
  id: string;
  type: 'interest' | 'message' | 'match';
  fromUserId: string;
  fromUserName: string;
  fromUserPhoto?: string;
  message?: string;
  read: boolean;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("discovery");
  const [showLogout, setShowLogout] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // State for dynamic data
  const [matches, setMatches] = useState<Match[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [discovery, setDiscovery] = useState<Discovery[]>([]);
  const [stats, setStats] = useState<Stats>({
    profileViews: 0,
    matches: 0,
    messages: 0,
    compatibilityScore: 0
  });
  const [user, setUser] = useState<any>(null);

  // Fetch all dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError("");
      
      try {
        // Check if user is logged in
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        // Fetch user profile first
        const userRes = await api.get("/api/users/profile");
        if (userRes.data.success) {
          setUser(userRes.data.user);
        }

        // For now, keep matches and messages empty
        setMatches([]);
        setMessages([]);

        // Fetch discovery profiles from your profile API
        try {
          console.log("Fetching discovery profiles...");
          const discoveryRes = await api.get("/api/profile/discovery/all");
          console.log("Discovery profiles:", discoveryRes.data);
          
          // Transform the data to match your Discovery interface
          const profiles = discoveryRes.data.profiles.map((p: any) => ({
            id: p._id,
            name: p.name,
            age: p.age,
            location: p.location,
            occupation: p.occupation || "Not specified",
            interests: p.interests || ["Friendly", "Honest"],
            isOnline: Math.random() > 0.5,
            profilePicture: p.photo ? `http://localhost:5001${p.photo}` : null
          }));
          
          setDiscovery(profiles);
        } catch (err) {
          console.log("No discovery profiles found");
          setDiscovery([]);
        }

        // Fetch stats from profile API
        try {
          const statsRes = await api.get("/api/profile/stats/me");
          setStats(statsRes.data.stats || {
            profileViews: 0,
            matches: 0,
            messages: 0,
            compatibilityScore: 0
          });
        } catch (err) {
          console.log("No stats available");
        }

        // Fetch notifications
        try {
          const notifRes = await api.get("/api/notifications");
          setNotifications(notifRes.data.notifications || []);
          setUnreadCount(notifRes.data.notifications?.filter((n: Notification) => !n.read).length || 0);
        } catch (err) {
          console.log("No notifications");
        }

      } catch (err: any) {
        console.error("Error fetching dashboard data:", err);
        if (err.response?.status === 401) {
          setError("Session expired. Please login again.");
          localStorage.removeItem("token");
          router.push("/login");
        } else {
          setError("Failed to load dashboard data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

    // Poll for new notifications every 30 seconds
    const interval = setInterval(() => {
      fetchNotifications();
    }, 30000);

    return () => clearInterval(interval);
  }, [router]);

  const fetchNotifications = async () => {
    try {
      const notifRes = await api.get("/api/notifications");
      setNotifications(notifRes.data.notifications || []);
      setUnreadCount(notifRes.data.notifications?.filter((n: Notification) => !n.read).length || 0);
    } catch (err) {
      console.log("Error fetching notifications");
    }
  };

  const handleInterest = async (profileId: string) => {
    try {
      const response = await api.post(`/api/interests/${profileId}`);
      
      if (response.data.success) {
        // Update UI to show interested
        setDiscovery(discovery.map(d => 
          d.id === profileId ? { ...d, isInterested: true } : d
        ));
        
        // Show success message
        alert("Interest shown! The user will be notified.");
        
        // Refresh notifications
        fetchNotifications();
      }
    } catch (err) {
      console.error("Error showing interest:", err);
      alert("Failed to show interest. Please try again.");
    }
  };

  const markNotificationAsRead = async (notificationId: string) => {
    try {
      await api.put(`/api/notifications/${notificationId}/read`);
      setNotifications(notifications.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      ));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  const markAllNotificationsAsRead = async () => {
    try {
      await api.put("/api/notifications/read-all");
      setNotifications(notifications.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error("Error marking all as read:", err);
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  // Stats formatted for display
  const displayStats = [
    { label: "Profile Views", value: stats.profileViews, icon: Users, change: "+0%", color: "text-blue-600" },
    { label: "Matches", value: stats.matches, icon: Heart, change: "+0", color: "text-pink-600" },
    { label: "Messages", value: stats.messages, icon: MessageCircle, change: "+0", color: "text-green-600" },
    { label: "Compatibility Score", value: `${stats.compatibilityScore}%`, icon: Award, change: "+0%", color: "text-purple-600" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push("/login")}
            className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 relative">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <HeartHandshake className="h-8 w-8 text-pink-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Bandhan
              </span>
            </Link>

            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search matches..."
                  className="w-full pl-10 pr-4 py-2 border border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications Bell */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 hover:bg-pink-50 rounded-full transition"
                >
                  <Bell className="h-6 w-6 text-gray-600 hover:text-pink-600" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-pink-100 z-50">
                    <div className="p-3 border-b border-pink-100 flex justify-between items-center">
                      <h3 className="font-semibold">Notifications</h3>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllNotificationsAsRead}
                          className="text-xs text-pink-600 hover:text-pink-700"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notif) => (
                          <div
                            key={notif.id}
                            className={`p-3 border-b border-pink-50 hover:bg-pink-50 cursor-pointer transition ${
                              !notif.read ? 'bg-pink-50/50' : ''
                            }`}
                            onClick={() => markNotificationAsRead(notif.id)}
                          >
                            <div className="flex items-start space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white text-sm">
                                {notif.fromUserName?.charAt(0)}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm">
                                  <span className="font-semibold">{notif.fromUserName}</span>
                                  {notif.type === 'interest' && ' is interested in your profile!'}
                                  {notif.type === 'match' && ' liked you back! You have a new match!'}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {new Date(notif.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                              {!notif.read && (
                                <div className="w-2 h-2 bg-pink-600 rounded-full"></div>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center text-gray-500">
                          <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                          <p className="text-sm">No notifications yet</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push("/profile")}>
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white">
                  {user?.name?.charAt(0) || "U"}
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
              <button onClick={() => setShowLogout(true)} className="ml-2 p-2 rounded-full hover:bg-pink-50 transition">
                <LogOut className="w-5 h-5 text-red-500" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64 space-y-6">
          <div className="bg-white rounded-2xl shadow-md p-6 border border-pink-100">
            <h4 className="font-semibold mb-4">Navigation</h4>
            {[
              { name: "Matches", tab: "matches" },
              { name: "Messages", tab: "messages" },
              { name: "Discovery", tab: "discovery" },
            ].map((item) => (
              <button
                key={item.tab}
                onClick={() => setActiveTab(item.tab)}
                className={`w-full text-left px-4 py-2 rounded-lg mb-2 transition ${
                  activeTab === item.tab ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white" : "hover:bg-pink-50 text-gray-600"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Stats Cards */}
          <div className="space-y-4">
            {displayStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md p-4 border border-pink-100 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  <span className="text-gray-600 text-sm">{stat.label}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold">{stat.value}</div>
                  <div className="text-xs text-green-500">{stat.change}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Matches Tab */}
          {activeTab === "matches" && (
            <div className="bg-white rounded-2xl shadow-md p-6 border border-pink-100">
              <h3 className="font-semibold text-lg mb-4">Your Matches</h3>
              {matches.length > 0 ? (
                <div className="space-y-4">
                  {matches.map((m) => (
                    <div key={m.id} className="flex items-start space-x-4 p-4 bg-pink-50/30 rounded-xl border border-pink-100 hover:bg-pink-50 transition">
                      <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-400 rounded-xl flex items-center justify-center text-white text-2xl">
                        {m.name?.charAt(0) || "?"}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{m.name}, {m.age}</h4>
                        <p className="text-sm text-gray-500 flex items-center"><MapPin className="w-3 h-3 mr-1" />{m.location}</p>
                        <p className="text-sm text-gray-500 flex items-center"><Briefcase className="w-3 h-3 mr-1" />{m.occupation}</p>
                        {m.interests && m.interests.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {m.interests.map((i, idx) => (
                              <span key={idx} className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">{i}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-pink-600">{m.compatibility}%</div>
                        <p className="text-xs text-gray-500">Match</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg">No matches yet</p>
                  <p className="text-sm">Start exploring to find your perfect match!</p>
                </div>
              )}
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === "messages" && (
            <div className="bg-white rounded-2xl shadow-md p-6 border border-pink-100">
              <h3 className="font-semibold text-lg mb-4">Messages</h3>
              {messages.length > 0 ? (
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div key={msg.id} className="flex justify-between items-center p-3 rounded-xl hover:bg-pink-50 transition cursor-pointer border border-transparent hover:border-pink-100">
                      <div className="flex-1">
                        <h4 className="font-semibold">{msg.name}</h4>
                        <p className="text-sm text-gray-500 truncate">{msg.lastMessage}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-gray-400">{msg.time}</span>
                        {msg.unread > 0 && (
                          <span className="bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-auto mt-1">
                            {msg.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg">No messages yet</p>
                  <p className="text-sm">Start a conversation with your matches!</p>
                </div>
              )}
            </div>
          )}

          {/* Discovery Tab - YOUR ORIGINAL CODE COMPLETELY INTACT */}
          {activeTab === "discovery" && (
            <div className="bg-white rounded-2xl shadow-md p-6 border border-pink-100">
              <h3 className="font-semibold text-lg mb-4">Discover People</h3>
              {discovery.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {discovery.map((d) => (
                    <div key={d.id} className="bg-pink-50/30 rounded-xl p-4 border border-pink-100 hover:bg-pink-50 transition">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl overflow-hidden">
                          {d.profilePicture ? (
                            <img src={d.profilePicture} alt={d.name} className="w-full h-full object-cover" />
                          ) : (
                            d.name?.charAt(0) || "?"
                          )}
                        </div>
                        <h4 className="font-semibold text-lg">{d.name}, {d.age}</h4>
                        <p className="text-sm text-gray-500 flex items-center justify-center">
                          <MapPin className="w-3 h-3 mr-1" /> {d.location}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center justify-center">
                          <Briefcase className="w-3 h-3 mr-1" /> {d.occupation}
                        </p>
                        {d.interests && d.interests.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3 justify-center">
                            {d.interests.map((i, idx) => (
                              <span key={idx} className="text-xs bg-pink-100 text-pink-600 px-3 py-1 rounded-full">
                                {i}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="mt-4 flex justify-center space-x-2">
                          <button
                            onClick={() => handleInterest(d.id)}
                            className="bg-pink-600 text-white px-4 py-2 rounded-full text-sm hover:bg-pink-700 transition flex items-center"
                          >
                            <Heart className="w-4 h-4 mr-1" /> Interested
                          </button>
                          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm hover:bg-gray-300 transition">
                            Pass
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-gray-500">
                  <Users className="w-20 h-20 mx-auto mb-4 text-gray-300" />
                  <p className="text-xl font-medium mb-2">No profiles to discover yet</p>
                  <p className="text-sm">Be the first to create your profile and others will appear here!</p>
                  <button 
                    onClick={() => router.push("/profile")}
                    className="mt-4 bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition"
                  >
                    Create Your Profile
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Premium CTA */}
          <div className="bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl shadow-md p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Upgrade to Premium</h3>
                <p className="text-pink-100">Get 3x more matches, see who liked you, and much more!</p>
              </div>
              <Gem className="w-16 h-16 text-white/20" />
            </div>
            <button className="mt-4 bg-white text-pink-600 px-6 py-2 rounded-full font-semibold hover:bg-pink-50 transition">
              View Plans
            </button>
          </div>
        </div>
      </div>

      {/* Logout Popup */}
      {showLogout && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-80 text-center">
            <h3 className="text-lg font-semibold mb-4">Are you sure you want to logout?</h3>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
              <button
                onClick={() => setShowLogout(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}