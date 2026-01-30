"use client";
import { User, Lock } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { toast } from "sonner";

interface Props {
  role: "student" | "teacher";
}

export default function LoginForm({ role }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    userCode: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn(role, {
      redirect: false,
      ...(role === "student"
        ? { studentCode: form.userCode }
        : { username: form.userCode }),
      password: form.password,
    });

    setLoading(false);

    if (!res) {
      toast.error("Something went wrong!");
      return;
    }
    if (res?.error) {
      toast.error("Invalid Credentials!");
      return;
    }

    toast.success("Signed in successfully");

    //Redirect based on role
    router.push(
      role === "student" ? "/student/dashboard" : "/teacher/dashboard",
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Username / Student Code */}
      <div>
        <label className="text-sm text-gray-100 font-medium">
          {role === "student" ? "Student Code" : "Username"}
        </label>

        <div className="relative mt-1">
          <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <input
            required
            value={form.userCode}
            type="text"
            onChange={(e) => {
              setForm({ ...form, userCode: e.target.value });
            }}
            className="w-full bg-gray-950 border border-gray-800 rounded-md py-2 pl-9 pr-3 text-[16px] text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={
              role === "student" ? "Enter student code" : "Enter username"
            }
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="text-sm text-gray-100 font-medium">Password</label>

        <div className="relative mt-1">
          <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <input
            required
            value={form.password}
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });
            }}
            type="password"
            className="w-full bg-gray-950 border border-gray-800 rounded-md py-2 pl-9 pr-3 text-[16px] text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
        </div>
        <button className="text-lg text-blue-400 font-bold hover:underline items-start text-sm hover:underline cursor-pointer font-medium">
          Forgot your password?
        </button>
      </div>

      {/* Submit */}
      <button
        disabled={loading}
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-md text-sm font-medium"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
