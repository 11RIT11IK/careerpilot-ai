import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {

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

        {/* Navigation Links */}

        <div
          className="
            hidden
            items-center
            gap-8
            md:flex
          "
        >
					 <Link
            href="/"
            className="
              text-sm
              font-medium
              text-gray-300
              transition-colors
              hover:text-white
            "
          >
            Home
          </Link>

          <Link
            href="/#features"
            className="
              text-sm
              font-medium
              text-gray-300
              transition-colors
              hover:text-white
            "
          >
            Features
          </Link>

          <Link
            href="/#how-it-works"
            className="
              text-sm
              font-medium
              text-gray-300
              transition-colors
              hover:text-white
            "
          >
            How it Works
          </Link>

          <Link
            href="/#pricing"
            className="
              text-sm
              font-medium
              text-gray-300
              transition-colors
              hover:text-white
            "
          >
            Pricing
          </Link>

          <Link
            href="/#contact"
            className="
              text-sm
              font-medium
              text-gray-300
              transition-colors
              hover:text-white
            "
          >
            Contact
          </Link>
        </div>

        {/* Action Buttons */}

        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <Link
            href="/login"
            className="
              text-sm
              font-medium
              text-gray-300
              transition-colors
              hover:text-white
            "
          >
            Login
          </Link>

          <Link href="/signup">

          <Button
            className="
              rounded-full
              px-6
            "
          >
            Get Started
          </Button>
					</Link>
        </div>
      </div>
    </nav>
  );
}