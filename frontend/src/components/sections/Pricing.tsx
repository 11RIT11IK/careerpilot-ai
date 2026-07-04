import FadeUp from "@/components/animations/FadeUp";
import GridBackground from "@/components/effects/GridBackground";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: "₹0",
    description: "Perfect for getting started.",
    featured: true,
    features: [
      "Resume Analysis",
      "Basic AI Chat",
      "Career Roadmap",
      "Community Support",
    ],
  },
  {
    name: "Pro",
    price: "₹499",
    description: "Everything you need to accelerate your career.",
    featured: false,
    features: [
      "Everything in Free",
      "Unlimited Resume Reviews",
      "Mock Interviews",
      "AI Career Coach",
      "Priority Support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For colleges and organizations.",
    featured: false,
    features: [
      "Everything in Pro",
      "Team Dashboard",
      "Analytics",
      "Dedicated Support",
    ],
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-[#171717] py-28"
    >
      <GridBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">

        <FadeUp>

          <div className="mx-auto max-w-3xl text-center">

            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-400">
              Pricing
            </span>

            <h2 className="mt-6 text-4xl font-bold text-white lg:text-5xl">
              Choose The Plan
              That Fits You
            </h2>

            <p className="mt-6 text-lg text-zinc-400">
              Flexible pricing designed for students,
              professionals and organizations.
            </p>

          </div>

        </FadeUp>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">

          {plans.map((plan, index) => (

            <FadeUp key={plan.name} delay={index * 0.15}>

              <div
                className={`rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-2 ${
                  plan.featured
                    ? "border-violet-500 bg-[#252525] shadow-[0_0_60px_rgba(139,92,246,0.15)]"
                    : "border-white/10 bg-[#212121]"
                }`}
              >

                <h3 className="text-2xl font-bold text-white">
                  {plan.name}
                </h3>

                <p className="mt-3 text-zinc-400">
                  {plan.description}
                </p>

                <h2 className="mt-8 text-5xl font-bold text-white">
                  {plan.price}
                </h2>

                <Button className="mt-8 w-full rounded-full">
                  Get Started
                </Button>

                <div className="mt-8 space-y-4">

                  {plan.features.map((feature) => (

                    <div
                      key={feature}
                      className="flex items-center gap-3"
                    >
                      <Check className="h-5 w-5 text-violet-400" />

                      <span className="text-zinc-300">
                        {feature}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

            </FadeUp>

          ))}

        </div>

      </div>
    </section>
  );
}