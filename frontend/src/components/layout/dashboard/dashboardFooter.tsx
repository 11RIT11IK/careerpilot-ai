import Link from "next/link";

export default function DashboardFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#171717]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-5 text-sm text-zinc-500 md:flex-row">

        <p>
          © {new Date().getFullYear()} CareerPilot AI. All rights reserved.
        </p>

        <div className="flex items-center gap-6">

          <Link
            href="#"
            className="transition hover:text-white"
          >
            Settings
          </Link>

          <Link
            href="#"
            className="transition hover:text-white"
          >
            Privacy
          </Link>

          <Link
            href="#"
            className="transition hover:text-white"
          >
            Terms
          </Link>

        </div>

      </div>
    </footer>
  );
}