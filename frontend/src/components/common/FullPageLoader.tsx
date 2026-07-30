"use client";

import { Loader2 } from "lucide-react";

export default function FullPageLoader() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center">

      <Loader2 className="h-10 w-10 animate-spin text-violet-500" />

      <p className="mt-5 text-sm text-zinc-400">
        Loading your workspace...
      </p>

    </div>
  );
}