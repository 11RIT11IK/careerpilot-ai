import Image from "next/image";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import Pricing from "@/components/sections/Pricing";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
		<>
		<Hero />
		<Features />
		<HowItWorks />
		<Pricing />
		<Contact />
    </>
  );
}
