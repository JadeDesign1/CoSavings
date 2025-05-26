import { getCurrentUser } from "@/actions/page";
import { AppHeader, HomeHeader } from "@/component/appHeader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default async function AppWrapper({ children }) {
  const { status, user } = await getCurrentUser();

  return (
    <div className="overflow-hidden">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />

      {user ? <HomeHeader /> : <AppHeader />}
      {children}
    </div>
  );
}
