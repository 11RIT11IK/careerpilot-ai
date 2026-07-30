import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashBoardNavbar() {

  return (
    <nav
      className="
        fixed
        top-0
        left-0
        w-full
        z-50
        border-b
        border-white/10
        bg-[#212121]
        backdrop-blur-xl
      "
    >
      <div
        className="
          mx-auto
          flex
          h-16
          max-w-7xl
          items-center
          justify-between
          px-6
          lg:px-8
        "
      >
        {/* Logo */}

        <Link
          href="/"
          className="
            flex
            items-center
            gap-2
            text-xl
            font-bold
            text-white
          "
        >
          <Sparkles className="h-6 w-6 text-violet-400" />

          <span>CareerPilot AI</span>
        </Link>

      

        
      </div>
    </nav>
  );
}