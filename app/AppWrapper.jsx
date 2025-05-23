import { getCurrentUser } from "@/actions/page";
import { AppHeader, HomeHeader } from "@/component/appHeader";
import { ToastContainer } from "react-toastify";

export default async function AppWrapper({ children }) {
  const { status, user } = await getCurrentUser();

  return (
    <div className="overflow-hidden">
      <ToastContainer />
      {user ? <HomeHeader /> : <AppHeader />}
      {children}
    </div>
  );
}
