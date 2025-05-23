import { LoginGithub, LoginGoogle } from "@/component/form/authProviders";
import LoginForm from "@/component/form/loginForm";

import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <div className="w-full flex mt-20 justify-center">
        <LoginForm />
      </div>
    </>
  );
}
