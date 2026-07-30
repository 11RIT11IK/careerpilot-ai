import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Spotlight from "../effects/Spotlight";
import GridBackground from "../effects/GridBackground";
import LightBeam from "../effects/LightBeam";
import FloatingOrbs from "../effects/FloatingOrbs";
import FadeUp from "../animations/FadeUp";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#171717]">

			<Spotlight />
			<GridBackground />
			<LightBeam />
			<FloatingOrbs />


      <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-between gap-20 px-6 pt-36 pb-24 lg:flex-row lg:px-8">
        {/* Left Content */}

        <div className="max-w-2xl">

          {/* Badge */}

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
            <Sparkles className="h-4 w-4 text-violet-400" />

            AI-Powered Career Development Platform
          </div>

          {/* Heading */}
          <FadeUp>
						<h1 className="text-5xl font-bold leading-tight tracking-tight text-white lg:text-7xl">
            Build Your Dream Career
            <br />
            <span className="text-zinc-400">
              with AI That Guides Every Step.
            </span>
          </h1>
					</FadeUp>
         

          {/* Description */}
         <FadeUp delay={0.2}>
         <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-400">
            Analyze your resume, discover skill gaps, prepare for technical
            interviews, and receive personalized career roadmaps powered by
            artificial intelligence.
          </p>
					</FadeUp>

          {/* Buttons */}

          <div className="mt-10 flex flex-wrap gap-4">
            <FadeUp delay={0.4}>
            
						<Link href="/login">
						<Button className="rounded-full px-8">
              Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
						</Link>
           

{/* 
            <Button
              variant="outline"
              className="rounded-full border-white/10 bg-transparent px-8 text-white hover:bg-white/10"
            >
              Watch Demo
            </Button> */}
						</FadeUp>


          </div>

          {/* Statistics */}

          <div className="mt-14 flex flex-wrap gap-10">

             <FadeUp delay={0.6}>
							<div>
								<h3 className="text-3xl font-bold text-white">10K+</h3>
								<p className="mt-1 text-sm text-zinc-500">
									Active Users
								</p>
							</div>
						  </FadeUp>

							<FadeUp delay={0.75}>
								<div>
									<h3 className="text-3xl font-bold text-white">95%</h3>
									<p className="mt-1 text-sm text-zinc-500">
										Career Success
									</p>
								</div>
							</FadeUp>

							<FadeUp delay={0.9}>
								<div>
									<h3 className="text-3xl font-bold text-white">24/7</h3>
									<p className="mt-1 text-sm text-zinc-500">
										AI Assistance
									</p>
								</div>
							</FadeUp>

          </div>

        </div>

        {/* Right Preview */}

        <div className="flex w-full max-w-lg justify-center">

          <div className="w-full rounded-3xl border border-white/10 bg-[#212121] p-8">
            
						<FadeUp delay={0.2}>
							 <div className="mb-8">
              <p className="text-sm text-zinc-400">
                Resume Score
              </p>

              <h2 className="mt-2 text-5xl font-bold text-white">
                92%
              </h2>
            </div>
						</FadeUp>
           

            <div className="space-y-5">
               
							<FadeUp delay={0.4}>
								<div className="rounded-2xl bg-white/5 p-5">
                <p className="text-sm text-zinc-400">
                  AI Career Chat
                </p>

                <p className="mt-2 text-white">
                  Your React skills are excellent.
                  Focus on System Design next.
                </p>
              </div>
							</FadeUp>
              
              <FadeUp delay={0.6}>
								 <div className="rounded-2xl bg-white/5 p-5">

                <p className="mb-3 text-sm text-zinc-400">
                  Career Roadmap
                </p>

                <ul className="space-y-2 text-white">

                  <li>✔ HTML & CSS</li>

                  <li>✔ JavaScript</li>

                  <li>✔ React</li>

                  <li>○ Node.js</li>

                  <li>○ System Design</li>

                </ul>

              </div>
							</FadeUp>
             

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}