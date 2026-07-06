
"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

import FadeUp from "@/components/animations/FadeUp";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between gap-20">

      {/* Left Side */}

      <FadeUp>

        <div className="hidden max-w-xl lg:block">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
            <Sparkles className="h-4 w-4 text-violet-400" />
            Welcome Back
          </div>

          <h1 className="text-6xl font-bold leading-tight text-white">
            Continue Your
            <br />
            Career Journey.
          </h1>

          <p className="mt-8 text-lg leading-8 text-zinc-400">
            Sign in to access your AI career dashboard, resume analysis,
            interview preparation, and personalized learning roadmap.
          </p>

          <div className="mt-12 space-y-5">

            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-violet-400" />
              <span className="text-zinc-300">
                Resume Analyzer
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
                Career Roadmaps
              </span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-violet-400" />
              <span className="text-zinc-300">
                Track Your Progress
              </span>
            </div>

          </div>

        </div>

      </FadeUp>

      {/* Right Side */}

      <FadeUp delay={0.2}>

        <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#212121]/90 p-10 backdrop-blur-xl">

          {/* Header */}

          <div className="mb-8 flex flex-col items-center">

            <div className="mb-5 rounded-2xl bg-violet-500/10 p-4">
              <Sparkles className="h-8 w-8 text-violet-400" />
            </div>

            <h2 className="text-3xl font-bold text-white">
              Welcome Back
            </h2>

            <p className="mt-3 text-center text-zinc-400">
              Sign in to continue your AI-powered career journey.
            </p>

          </div>

          {/* Login Form */}

          <form className="space-y-6">

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

            <div>

              <div className="mb-2 flex items-center justify-between">

                <label className="text-sm text-zinc-300">
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-sm text-violet-400 hover:text-violet-300"
                >
                  Forgot Password?
                </Link>

              </div>

              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-[#171717] px-4 py-3 text-white outline-none transition-all placeholder:text-zinc-500 focus:border-violet-500"
              />

            </div>

            <Button className="w-full rounded-full py-6">

              Sign In

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

          {/* Google */}

          <Button
            variant="outline"
            className="w-full rounded-full border-white/10 bg-transparent py-6 text-white hover:bg-white/5"
          >
            Continue with Google
          </Button>

          {/* Footer */}

          <p className="mt-8 text-center text-sm text-zinc-400">

            Don't have an account?

            <Link
              href="/signup"
              className="ml-2 font-medium text-violet-400 hover:text-violet-300"
            >
              Create Account
            </Link>

          </p>

        </div>

      </FadeUp>

    </div>
  );
}