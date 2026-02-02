"use server";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/auth";

export async function changePassword(
  currentPassword: string,
  newPassword: string,
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { error: "Unauthorized!" };
  }

  const userId = Number(session.user.id);

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return { error: "User not found!" };
  }

  // verify old password
  const isValid = await bcrypt.compare(currentPassword, user.password);

  if (!isValid) {
    return { error: "Current password is incorrect" };
  }

  // prevent same password reuse
  const samePassword = await bcrypt.compare(newPassword, user.password);

  if (samePassword) {
    return { error: "New password must be different" };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
        isFirstLogin: false,
      },
    });
    return { success: true };
  } catch (e) {
    console.log(e);
    return { error: "Failed to update Password" };
  }
}
