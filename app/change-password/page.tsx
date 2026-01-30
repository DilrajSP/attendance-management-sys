import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ChangePasswordForm from "@/components/ChangePasswordForm";
import { authOptions } from "@/auth";

export default async function ChangePasswordPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/");

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <ChangePasswordForm />
    </div>
  );
}
