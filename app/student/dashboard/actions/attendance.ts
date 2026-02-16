"use server";
import { authOptions } from "@/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export type ActionResponse = {
  success: boolean;
  message?: string;
};

export async function verifyOtpAndMarkAttendance(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "STUDENT") {
      return { success: false, message: "Unauthorized access." };
    }

    const otp = formData.get("otp") as string;
    const sessionId = Number(formData.get("sessionId"));

    if (!otp || !sessionId) {
      return { success: false, message: "OTP is required." };
    }

    const studentId = Number(session.user.id);
    const now = new Date();

    // 1. Fetch session
    const attendanceSession = await prisma.attendanceSession.findUnique({
      where: { id: sessionId },
      select: {
        id: true,
        otp: true,
        expiresAt: true,
        isLocked: true,
      },
    });

    if (!attendanceSession || attendanceSession.isLocked) {
      return {
        success: false,
        message: "Attendance session is no longer active.",
      };
    }

    if (attendanceSession.expiresAt <= now) {
      return { success: false, message: "The session has expired." };
    }

    // 2. OTP check
    if (attendanceSession.otp !== otp) {
      return { success: false, message: "Incorrect OTP. Please try again." };
    }

    // 3. Prevent duplicate attendance
    const alreadyMarked = await prisma.attendanceRecord.findUnique({
      where: {
        sessionId_studentId: {
          sessionId,
          studentId,
        },
      },
    });

    if (alreadyMarked) {
      return {
        success: false,
        message: "You have already marked your attendance.",
      };
    }

    // 4. Mark attendance
    await prisma.attendanceRecord.create({
      data: {
        sessionId,
        studentId,
        status: "PRESENT",
      },
    });

    // 5. Revalidate the dashboard path to sync server data
    revalidatePath("/student/dashboard");

    return { success: true, message: "Attendance marked Successfully!" };
  } catch (error) {
    console.error("ATTENDANCE ERROR: ", error);
    return {
      success: false,
      message: "A server error occurred. Please try again later.",
    };
  }
}
