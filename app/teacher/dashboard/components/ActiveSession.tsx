type ActiveSessionProps = {
  activeSession: {
    course: string;
    year: number;
    subject: string;
    section: string;
    otp: string;
    expiresAt: Date;
  } | null;
};

export default function ActiveSession({ activeSession }: ActiveSessionProps) {
  if (!activeSession) {
    return (
      <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-900">
        <p className="text-zinc-400">No active attendance session</p>
      </div>
    );
  }

  return (
    <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-900 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Active Attendance Session</h2>
        <span className="text-xs px-2 py-1 rounded bg-green-600/20 text-green-400">
          ACTIVE
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
        <div>
          <p className="text-zinc-400">Subject</p>
          <p>{activeSession.subject}</p>
        </div>
        <div>
          <p className="text-zinc-400">Course</p>
          <p>{activeSession.course}</p>
        </div>
        <div>
          <p className="text-zinc-400">Year</p>
          <p>{activeSession.year}</p>
        </div>
        <div>
          <p className="text-zinc-400">Section</p>
          <p>{activeSession.section}</p>
        </div>
      </div>

      {/* OTP + timer will be wired next */}
      <div className="border-t border-zinc-800 pt-4 flex items-center justify-between">
        <div>
          <p className="text-zinc-400 text-sm">Attendance OTP</p>
          <p className="text-3xl font-mono tracking-widest">
            {activeSession.otp}
          </p>
        </div>

        <span className="text-xs text-zinc-400">Valid for 10 minutes</span>
      </div>
    </div>
  );
}
