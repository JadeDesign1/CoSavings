import { getCurrentUser } from "@/actions/page";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }) {
  const { user } = await getCurrentUser();
  if (user) {
    redirect("/home");
  }

  return <>{children}</>;
}
