import Features from "@/component/landingpage/features";
import Footer from "@/component/footer";
import HeroSection from "@/component/landingpage/heroSection";
import HowItWork from "@/component/landingpage/howItWork";
import Testimonials from "@/component/landingpage/testimonials";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (data?.user) {
    redirect("/home");
  }

  return (
    <>
      <div className="bg-white text-gray-900 w-[100vw]">
        {/* <!-- Hero Section --> */}
        <HeroSection />

        {/* <!-- How It Works --> */}
        <HowItWork />
        {/* <!-- Features --> */}
        <Features />
        {/* <!-- Testimonials --> */}
        <Testimonials />

        {/* <!-- CTA Footer --> */}
        <Footer />
      </div>
    </>
  );
}
