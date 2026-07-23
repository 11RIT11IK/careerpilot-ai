"use client";

import { useDashboard } from "@/context/DashboardContext";


export default function DashboardProfile() {

  const { user } = useDashboard();

  return (

 <div className="flex min-h-[70vh] items-center justify-center">

      <section
        className="
          w-full
          max-w-md
          rounded-3xl
          border
          border-white/10
          bg-[#202020]
          p-10
          shadow-lg
          shadow-black/20
        "
      >

        <div className="flex flex-col items-center text-center">

          {/* Avatar */}

          <div
            className="
              mb-6
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-full
              bg-violet-600
              text-4xl
              font-bold
              text-white
            "
          >
            {user?.fullName.charAt(0).toUpperCase()}
          </div>

          {/* Name */}

          <h2 className="text-2xl font-semibold text-white">
            {user?.fullName}
          </h2>

          {/* Email */}

          <p className="mt-2 text-zinc-400">
            {user?.email}
          </p>

        </div>

      </section>

    </div>

  );
}