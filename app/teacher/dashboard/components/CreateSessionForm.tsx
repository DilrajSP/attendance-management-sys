"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createAttendanceSession } from "../actions/createAttendanceSession";

export default function CreateSessionForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    subject: "",
    course: "",
    year: "",
    section: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      try {
        await createAttendanceSession({
          subject: formData.subject,
          course: formData.course,
          year: Number(formData.year),
          section: formData.section,
        });

        // Refresh dashboard data (active session will appear)
        router.refresh();
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      }
    });
  }

  return (
    <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-900">
      <h2 className="text-lg font-semibold mb-4">Create Attendance Session</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {/* Subject */}
        <input
          name="subject"
          type="text"
          placeholder="Subject"
          className="input"
          value={formData.subject}
          onChange={handleChange}
          required
        />

        {/* Course */}
        <select
          name="course"
          className="input"
          value={formData.course}
          onChange={handleChange}
          required
        >
          <option value="">Course</option>
          <option value="BCA">BCA</option>
          <option value="BCS">BCS</option>
        </select>

        {/* Year */}
        <select
          name="year"
          className="input"
          value={formData.year}
          onChange={handleChange}
          required
        >
          <option value="">Year</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>

        {/* Section */}
        <select
          name="section"
          className="input"
          value={formData.section}
          onChange={handleChange}
          required
        >
          <option value="">Section</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>

        {/* Error */}
        {error && <p className="col-span-full text-sm text-red-400">{error}</p>}

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="col-span-full h-11 mt-2 rounded bg-indigo-600 hover:bg-indigo-500 transition disabled:opacity-50"
        >
          {isPending ? "Starting..." : "Start Session (10 min)"}
        </button>
      </form>
    </div>
  );
}
