"use server";

import { authOptions } from "@/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function updateStudentProfile(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "STUDENT") {
    return { error: "Unauthorized!" };
  }

  const course = formData.get("course") as string;
  const section = formData.get("section") as string;
  const year = formData.get("year");

  if (!course || !section || !year) {
    return { error: "All fields are required" };
  }

  try {
    await prisma.user.update({
      where: { id: Number(session.user.id) },
      data: {
        course,
        section,
        year: Number(year),
      },
    });

    // Clear the cache for the dashboard and profile pages
    revalidatePath("/student/dashboard");
    revalidatePath("/student/profile");
    return { success: true };
  } catch (e) {
    console.log(e);
    return { error: "Failed to update profile database" };
  }
}
