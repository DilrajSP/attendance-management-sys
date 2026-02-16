"use server";
import { authOptions } from "@/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function getStudentDashboardData() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "STUDENT") {
    throw new Error("Unauthorized");
  }

  const studentId = Number(session.user.id);
  const now = new Date();

  const student = await prisma.user.findUnique({
    where: { id: studentId },
    select: {
      name: true,
      studentCode: true,
      course: true,
      year: true,
      section: true,
    },
  });

  if (!student?.course || !student.year || !student.section) {
    return {
      student,
      activeSession: null,
      needsProfileSetup: true,
      isAlreadyMarked: false, //default
    };
  }

  const activeSession = await prisma.attendanceSession.findFirst({
    where: {
      course: student.course,
      year: student.year,
      section: student.section,
      expiresAt: { gt: now },
      isLocked: false,
    },
    select: {
      id: true,
      subject: true,
      course: true,
      year: true,
      section: true,
      expiresAt: true,
    },
  });

  // NEW: Check if attendance is already marked for this session
  let isAlreadyMarked = false;
  if (activeSession) {
    const record = await prisma.attendanceRecord.findUnique({
      where: {
        sessionId_studentId: {
          sessionId: activeSession.id,
          studentId: studentId,
        },
      },
    });
    isAlreadyMarked = !!record;
  }

  return {
    student,
    activeSession,
    needsProfileSetup: false,
    isAlreadyMarked,
  };
}
