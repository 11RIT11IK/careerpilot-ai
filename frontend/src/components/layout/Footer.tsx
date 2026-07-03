import Link from "next/link";
import {
Sparkles,
} from "lucide-react";
import { FaGithub,FaLinkedin  } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#171717]">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

        {/* Top Section */}

        <div className="grid gap-14 lg:grid-cols-5">

          {/* Brand */}

          <div className="lg:col-span-2">

            <Link
              href="/"
              className="inline-flex items-center gap-2"
            >
              <Sparkles className="h-6 w-6 text-violet-400" />

              <span className="text-xl font-bold text-white">
                CareerPilot AI
              </span>
            </Link>

            <p className="mt-5 max-w-md leading-7 text-zinc-400">
              AI-powered platform helping students and professionals
              analyze resumes, prepare for interviews, discover career
              paths, and achieve their dream jobs.
            </p>

            {/* Social Icons */}

            <div className="mt-8 flex items-center gap-5">

              <Link
                href="#"
                className="text-zinc-500 transition-all duration-300 hover:scale-110 hover:text-white"
              >
                <FaGithub className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                className="text-zinc-500 transition-all duration-300 hover:scale-110 hover:text-white"
              >
							<FaLinkedin className="h-5 w-5" />
              </Link>

 

            </div>

          </div>

          {/* Product */}

          <div>

            <h3 className="mb-5 font-semibold text-white">
              Product
            </h3>

            <ul className="space-y-4">

              <li>
                <Link href="#" className="text-zinc-400 transition hover:text-white">
                  Dashboard
                </Link>
              </li>

              <li>
                <Link href="#" className="text-zinc-400 transition hover:text-white">
                  Resume Analyzer
                </Link>
              </li>

              <li>
                <Link href="#" className="text-zinc-400 transition hover:text-white">
                  AI Career Chat
                </Link>
              </li>

              <li>
                <Link href="#" className="text-zinc-400 transition hover:text-white">
                  Roadmaps
                </Link>
              </li>

            </ul>

          </div>

          {/* Resources */}

          <div>

            <h3 className="mb-5 font-semibold text-white">
              Resources
            </h3>

            <ul className="space-y-4">

              <li>
                <Link href="#" className="text-zinc-400 transition hover:text-white">
                  Documentation
                </Link>
              </li>

              <li>
                <Link href="#" className="text-zinc-400 transition hover:text-white">
                  Blog
                </Link>
              </li>

              <li>
                <Link href="#" className="text-zinc-400 transition hover:text-white">
                  FAQ
                </Link>
              </li>

              <li>
                <Link href="#" className="text-zinc-400 transition hover:text-white">
                  Support
                </Link>
              </li>

            </ul>

          </div>

          {/* Company */}

          <div>

            <h3 className="mb-5 font-semibold text-white">
              Company
            </h3>

            <ul className="space-y-4">

              <li>
                <Link href="#" className="text-zinc-400 transition hover:text-white">
                  About
                </Link>
              </li>

              <li>
                <Link href="#" className="text-zinc-400 transition hover:text-white">
                  Careers
                </Link>
              </li>

              <li>
                <Link href="#" className="text-zinc-400 transition hover:text-white">
                  Contact
                </Link>
              </li>

              <li>
                <Link href="#" className="text-zinc-400 transition hover:text-white">
                  Privacy Policy
                </Link>
              </li>

            </ul>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-zinc-500 md:flex-row">

          <p>
            © 2026 CareerPilot AI. All rights reserved.
          </p>

          <p>
            Built with Next.js • TypeScript • Prisma • PostgreSQL
          </p>

        </div>

      </div>
    </footer>
  );
}