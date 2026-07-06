"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

import FadeUp from "@/components/animations/FadeUp";
import { Button } from "@/components/ui/button";

export default function SignupForm() {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between gap-20">

      {/* Left Side */}

      <FadeUp>

        <div className="hidden max-w-xl lg:block">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
            <Sparkles className="h-4 w-4 text-violet-400" />
            Join CareerPilot AI
          </div>

          <h1 className="text-6xl font-bold leading-tight text-white">
            Your Career.
            <br />
            Powered by AI.
          </h1>

          <p className="mt-8 text-lg leading-8 text-zinc-400">
            Build resumes, practice interviews, discover career paths,
            and receive personalized AI guidance—all in one platform.
          </p>

          <div className="mt-12 space-y-5">

            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-violet-400" />
              <span className="text-zinc-300">
                AI Resume Analysis
              </span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-violet-400" />
              <span className="text-zinc-300">
                Personalized Career Roadmaps
              </span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-violet-400" />
              <span className="text-zinc-300">
                AI Mock Interviews
              </span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-violet-400" />
              <span className="text-zinc-300">
                Skill Gap Analysis
              </span>
            </div>

          </div>

        </div>

      </FadeUp>

      {/* Right Side */}

      <FadeUp delay={0.2}>

        <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#212121]/90 p-12 backdrop-blur-xl">

          {/* Your existing form starts here */}

          <div className="mb-8 flex flex-col items-center">

            <div className="mb-5 rounded-2xl bg-violet-500/10 p-4">
              <Sparkles className="h-8 w-8 text-violet-400" />
            </div>

            <h2 className="text-3xl font-bold text-white">
              Create your account
            </h2>

            <p className="mt-3 text-center text-zinc-400">
              Start building your career with AI today.
            </p>

          </div>

          {/* Keep your current form exactly as it is */}

          {/* ... */}

         <form className="space-y-5">

  {/* Full Name */}

  <div>

    <label className="mb-2 block text-sm text-zinc-300">
      Full Name
    </label>

    <input
      type="text"
      placeholder="John Doe"
      className="w-full rounded-xl border border-white/10 bg-[#171717] px-4 py-3 text-white outline-none transition-all placeholder:text-zinc-500 focus:border-violet-500"
    />

  </div>

  {/* Email */}

  <div>

    <label className="mb-2 block text-sm text-zinc-300">
      Email Address
    </label>

    <input
      type="email"
      placeholder="john@example.com"
      className="w-full rounded-xl border border-white/10 bg-[#171717] px-4 py-3 text-white outline-none transition-all placeholder:text-zinc-500 focus:border-violet-500"
    />

  </div>

  {/* Password */}

  <div>

    <label className="mb-2 block text-sm text-zinc-300">
      Password
    </label>

    <input
      type="password"
      placeholder="••••••••"
      className="w-full rounded-xl border border-white/10 bg-[#171717] px-4 py-3 text-white outline-none transition-all placeholder:text-zinc-500 focus:border-violet-500"
    />

  </div>

  {/* Confirm Password */}

  <div>

    <label className="mb-2 block text-sm text-zinc-300">
      Confirm Password
    </label>

    <input
      type="password"
      placeholder="••••••••"
      className="w-full rounded-xl border border-white/10 bg-[#171717] px-4 py-3 text-white outline-none transition-all placeholder:text-zinc-500 focus:border-violet-500"
    />

  </div>

  {/* Register Button */}

  <Button className="mt-2 w-full rounded-full py-6">
    Create Account
    <ArrowRight className="ml-2 h-4 w-4" />
  </Button>

</form>

{/* Divider */}

<div className="my-8 flex items-center">

  <div className="h-px flex-1 bg-white/10" />

  <span className="mx-4 text-sm text-zinc-500">
    OR
  </span>

  <div className="h-px flex-1 bg-white/10" />

</div>

{/* Google Button */}

<Button
  variant="outline"
  className="w-full rounded-full border-white/10 bg-transparent py-6 text-white hover:bg-white/5"
>
  Continue with Google
</Button>

{/* Login Link */}

<p className="mt-8 text-center text-sm text-zinc-400">

  Already have an account?

  <Link
    href="/login"
    className="ml-2 font-medium text-violet-400 transition-colors hover:text-violet-300"
  >
    Sign In
  </Link>

</p>

        </div>

      </FadeUp>

    </div>
  );
}