import Spotlight from "@/components/effects/Spotlight";
import GridBackground from "@/components/effects/GridBackground";
import LightBeam from "@/components/effects/LightBeam";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {


	
  return (
   <main className="relative min-h-screen overflow-hidden bg-[#171717] px-6 pt-28 pb-20 flex items-center justify-center">
      <Spotlight />

      <GridBackground />

      <LightBeam />

      <SignupForm />
    </main>
  );
}