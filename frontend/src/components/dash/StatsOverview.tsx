import {
  Sparkles,
  ShieldCheck,
  Brain
} from "lucide-react";

const stats = [
  {
    title: "AI Powered",
    value: "100%",
    icon: Brain,
  },
  {
    title: "Secure Authentication",
    value: "Enabled",
    icon: ShieldCheck,
  },
  {
    title: "Upcoming Features",
    value: "Coming Soon",
    icon: Sparkles,
  },
];

export default function StatsOverview() {
  return (
    <section className="mb-14">

      <h2 className="mb-6 text-2xl font-semibold text-white">
        Platform Overview
      </h2>

      <div className="grid gap-6 md:grid-cols-3">

        {stats.map((item) => {

          const Icon = item.icon;

          return (

            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-[#202020] p-8">

              <Icon className="mb-5 h-8 w-8 text-violet-400" />

              <p className="text-sm text-zinc-500">
                {item.title}
              </p>

              <h3 className="mt-2 text-3xl font-bold text-white">
                {item.value}
              </h3>

            </div>

          );

        })}

      </div>

    </section>
  );
}