import { Search, FileText, Briefcase, TrendingUp } from "lucide-react";
import Link from "next/link";
import Spotlight from "@/components/effects/Spotlight";
import GridBackground from "@/components/effects/GridBackground";
import LightBeam from "@/components/effects/LightBeam";
import Dashboard from "@/components/dash/dashboard";

export default function DashboardPage() {
 	return (
		 <main className="relative min-h-screen overflow-hidden bg-[#171717] px-6 pt-28">
 
			 <Spotlight />
			 <GridBackground />
			 <LightBeam />
 
			 <Dashboard />
 
		 </main>
	 );
}