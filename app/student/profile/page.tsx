import { authOptions } from "@/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StudentProfileForm from "./components/StudentProfileForm";
import NoSSR from "@/components/NoSSR";

export default async function StudentProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "STUDENT") {
    redirect("/");
  }

  const student = await prisma.user.findUnique({
    where: { id: Number(session.user.id) },
    select: {
      name: true,
      studentCode: true,
      course: true,
      year: true,
      section: true,
    },
  });

  if (!student) redirect("/");

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <NoSSR>
        <Card className="w-full border-none shadow-none sm:shadow-sm max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Student Profile</CardTitle>
          </CardHeader>
          <CardContent>
            {/* ✅ Pass the data to the Client Form */}
            <StudentProfileForm student={student} />
          </CardContent>
        </Card>
      </NoSSR>
    </div>
  );
}
