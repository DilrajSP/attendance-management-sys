"use client";

type HistorySession = {
  id: number;
  subject: string;
  course: string;
  year: number;
  section: string;
  createdAt: Date;
};

export default function SessionHistory({
  sessions,
}: {
  sessions: HistorySession[];
}) {
  return (
    <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-900">
      <h2 className="text-lg font-semibold mb-4">Session History</h2>

      {sessions.length === 0 ? (
        <p className="text-zinc-400 text-sm">No past sessions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-zinc-400 border-b border-zinc-800">
              <tr>
                <th className="text-left py-2">Subject</th>
                <th className="text-center">Date</th>
                <th className="text-center">Course</th>
                <th className="text-center">Year</th>
                <th className="text-center">Section</th>
                <th className="text-right">Export</th>
              </tr>
            </thead>

            <tbody>
              {sessions.map((s) => (
                <tr key={s.id} className="border-b border-zinc-800">
                  <td className="py-3">{s.subject}</td>

                  {/* ✅ SSR-safe date */}
                  <td className="text-center">
                    {new Date(s.createdAt).toISOString().split("T")[0]}
                  </td>

                  <td className="text-center">{s.course}</td>
                  <td className="text-center">{s.year}</td>
                  <td className="text-center">{s.section}</td>

                  {/* ✅ SINGLE td — NO nesting */}
                  <td className="text-right">
                    <a
                      href={`/teacher/dashboard/sessions/${s.id}/csv`}
                      className="text-indigo-400 hover:underline"
                    >
                      CSV
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
