import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ChangePasswordForm from "@/components/ChangePasswordForm";
import { authOptions } from "@/auth";
import NoSSR from "@/components/NoSSR";

export default async function ChangePasswordPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/");

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4">
      <NoSSR>
        <ChangePasswordForm />
      </NoSSR>
    </div>
  );
}
