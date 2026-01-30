"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";
import AuthTabs from "./AuthTab";

export default function AuthCard() {
  const [role, setRole] = useState<"student" | "teacher">("student");

  return (
    <div className="w-full max-w-sm bg-gray-900 border border-gray-800 rounded-xl shadow-lg p-6">
      <AuthTabs role={role} setRole={setRole} />
      <LoginForm role={role} />
    </div>
  );
}
