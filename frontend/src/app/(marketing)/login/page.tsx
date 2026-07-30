import Spotlight from "@/components/effects/Spotlight";
import GridBackground from "@/components/effects/GridBackground";
import LightBeam from "@/components/effects/LightBeam";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center overflow-hidden bg-[#171717] px-6">

      <Spotlight />
      <GridBackground />
      <LightBeam />

      <LoginForm />

    </main>
  );
}