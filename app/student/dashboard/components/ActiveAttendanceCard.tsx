"use client";

import { useState, useTransition } from "react";
import { verifyOtpAndMarkAttendance } from "../actions/attendance";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  session: {
    id: number;
    subject: string;
    expiresAt: Date;
  };
};

export default function ActiveAttendanceCard({ session }: Props) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError(null);

    startTransition(async () => {
      try {
        await verifyOtpAndMarkAttendance(formData);
        setSuccess(true);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      }
    });
  }

  if (success) {
    return (
      <Card className="border-green-500/30 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-400">Attendance Marked</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-green-300">
          Your attendance has been successfully recorded.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Attendance Session</CardTitle>
      </CardHeader>

      <CardContent>
        <form action={handleSubmit} className="space-y-4">
          <input type="hidden" name="sessionId" value={session.id} />

          <div className="text-sm text-zinc-400">
            Subject: <span className="text-white">{session.subject}</span>
          </div>

          <Input
            name="otp"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          {error && <p className="text-sm text-red-400">{error}</p>}

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Verifying..." : "Submit OTP"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
