import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(
  _req: Request,
  context: { params: Promise<{ sessionId: string }> },
) {
  const { sessionId } = await context.params;
  const id = Number(sessionId);

  if (Number.isNaN(id)) {
    return new NextResponse("Invalid session id", { status: 400 });
  }

  // 1. Auth Check
  const session = await getServerSession(authOptions);
  if (!session || !["TEACHER", "ADMIN"].includes(session.user.role)) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // 2. Fetch the Attendance Session metadata
  const attendanceSession = await prisma.attendanceSession.findUnique({
    where: { id },
    include: {
      records: true, // We get the list of who actually marked attendance
    },
  });

  if (!attendanceSession) {
    return new NextResponse("Session not found", { status: 404 });
  }

  // 3. Fetch ALL students who SHOULD have been in this session
  const allEligibleStudents = await prisma.user.findMany({
    where: {
      role: "STUDENT",
      course: attendanceSession.course,
      year: attendanceSession.year,
      section: attendanceSession.section,
    },
    select: {
      id: true,
      name: true,
      studentCode: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  // 4. Create a Set of student IDs who are marked "PRESENT" for quick lookup
  const presentStudentIds = new Set(
    attendanceSession.records.map((r) => r.studentId),
  );

  // 5. Generate CSV Content
  // Added "Year" to the top metadata as requested
  let csv = `Course: ${attendanceSession.course}, Year: ${attendanceSession.year}, Section: ${attendanceSession.section}, Subject: ${attendanceSession.subject}\n`;
  csv += "Student ID,Student Name,Status\n";

  for (const student of allEligibleStudents) {
    const isPresent = presentStudentIds.has(student.id);
    const status = isPresent ? "PRESENT" : "ABSENT";

    // Clean up name to avoid CSV breaking if names contain commas
    const studentName = (student.name || "Unknown").replace(/,/g, "");
    const studentCode = student.studentCode || "N/A";

    csv += `${studentCode},${studentName},${status}\n`;
  }

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="attendance-${attendanceSession.subject}-${attendanceSession.course}-${attendanceSession.year}.csv"`,
    },
  });
}
