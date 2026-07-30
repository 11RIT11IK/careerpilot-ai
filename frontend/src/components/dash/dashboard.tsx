import DashboardHero from "./DashboardHero";
import QuickActions from "./QuickActions";
// import RecentActivity from "./RecentActivity";
import StatsOverview from "./StatsOverview";


export default function Dashboard() {
  return (
    <div className="relative z-10 mx-auto w-full max-w-7xl px-8 py-14">

      <section className="mb-20">
        <DashboardHero />
      </section>

      <section className="mb-20">
        <QuickActions />
      </section>

      <section className="mb-20">
        <StatsOverview />
      </section>

      {/* <section>
        <RecentActivity />
      </section> */}

    </div>
  );
}