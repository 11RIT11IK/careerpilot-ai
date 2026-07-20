export default function RecentActivity() {
  return (
    <section
      className="
        rounded-3xl
        border
        border-white/10
        bg-[#202020]
        p-8
      "
    >

      <h2 className="text-2xl font-semibold text-white">
        Recent Activity
      </h2>

      <div className="mt-6 rounded-2xl border border-dashed border-white/10 py-12 text-center">

        <p className="text-lg text-zinc-300">
          No recent activity yet.
        </p>

        <p className="mt-2 text-sm text-zinc-500">
          Your AI career journey will appear here once you start using CareerPilot.
        </p>

      </div>

    </section>
  );
}