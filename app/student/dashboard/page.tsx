import { getStudentDashboardData } from "./actions/student";
import ActiveAttendanceCard from "./components/ActiveAttendanceCard";

export default async function StudentDashboardPage() {
  const { student, activeSession, needsProfileSetup, isAlreadyMarked } =
    await getStudentDashboardData();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Welcome, {student?.name}</h1>
        <p className="text-muted-foreground text-sm">
          Student ID: {student?.studentCode}
        </p>
      </div>

      {/* Profile warning */}
      {needsProfileSetup && (
        <div className="border border-yellow-500/30 bg-yellow-500/10 rounded-lg p-4 text-sm text-yellow-300">
          Please complete your profile before marking attendance.
        </div>
      )}

      {/* Active Session */}
      {!needsProfileSetup && activeSession ? (
        <ActiveAttendanceCard
          session={activeSession}
          initialMarked={isAlreadyMarked}
        />
      ) : (
        !needsProfileSetup && (
          <div className="text-muted-foreground text-sm">
            No active attendance session.
          </div>
        )
      )}
    </div>
  );
}
