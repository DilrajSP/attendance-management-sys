  import { getTeacherDashboardData } from "./actions/teacher";
  import ActiveSession from "./components/ActiveSession";
  import CreateSessionForm from "./components/CreateSessionForm";
  import SessionHistory from "./components/SessionHistory";

  export default async function TeacherDashboardPage() {
    const { teacherName, activeSession, historySessions } =
      await getTeacherDashboardData();
    const hasActiveSession = !!activeSession; // UI-only toggle for now

    return (
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold">Welcome, {teacherName}</h1>
          <p className="text-zinc-400 text-sm">Manage attendance sessions</p>
        </div>

        {/* Active / Empty State */}
        <ActiveSession activeSession={activeSession} />

        {/* Create session (only when none active) */}
        {!hasActiveSession && <CreateSessionForm />}

        {/* History */}
        <SessionHistory sessions={historySessions} />
      </div>
    );
  }
