"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Heart, MapPin } from "lucide-react";

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

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch profile on page load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }

        const res = await api.get("/api/profile");
        console.log("Profile data:", res.data);
        
        if (res.data.success && res.data.profile) {
          const profile = res.data.profile;
          setName(profile.name || "");
          setAge(profile.age || "");
          setLocation(profile.location || "");
          setBio(profile.bio || "");
          if (profile.photo) {
            setPreview(`http://localhost:5001${profile.photo}`);
          }
        }
      } catch (err) {
        console.log("No profile found yet");
      }
    };
    fetchProfile();
  }, []);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSave = async () => {
    if (!name || !age || !location || !bio) {
      setMessage("Please fill all fields");
      return;
    }
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("age", age.toString());
    formData.append("location", location);
    formData.append("bio", bio);
    if (photo) formData.append("photo", photo);

    try {
      const res = await api.post("/api/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      if (res.data.success) {
        setMessage("Profile saved successfully!");
        if (res.data.profile?.photo) {
          setPreview(`http://localhost:5001${res.data.profile.photo}`);
        }
      }
    } catch (err: any) {
      console.error("Save error:", err);
      setMessage(err.response?.data?.error || "Error saving profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 p-8 flex justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Your Profile 💍</h1>

        <div className="flex flex-col items-center mb-6">
          <div className="w-28 h-28 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white text-4xl overflow-hidden mb-3">
            {preview ? (
              <img src={preview} alt="Profile" className="w-full h-full object-cover rounded-full" />
            ) : (
              <span>{name ? name.charAt(0).toUpperCase() : "R"}</span>
            )}
          </div>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handlePhotoChange}
            className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-gray-600 mb-1">
              <Heart className="w-4 h-4 text-pink-500" /> Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-gray-600 mb-1">
              Age
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value ? parseInt(e.target.value) : "")}
              className="w-full px-3 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Your age"
              min="18"
              max="100"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-gray-600 mb-1">
              <MapPin className="w-4 h-4 text-pink-500" /> Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Your city"
            />
          </div>

          <div>
            <label className="text-gray-600 mb-1">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Write something about yourself..."
              rows={4}
            />
          </div>

          {message && (
            <p className={`text-center text-sm ${message.includes("success") ? "text-green-500" : "text-red-500"}`}>
              {message}
            </p>
          )}

          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}