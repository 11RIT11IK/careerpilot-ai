export default function Spotlight() {
  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        overflow-hidden
      "
    >
      {/* Main Spotlight */}

      <div
        className="
          absolute
          left-1/2
          top-20
          h-[550px]
          w-[550px]
          -translate-x-1/2
          rounded-full
          bg-violet-500/10
          blur-[140px]
        "
      />

      {/* Secondary Glow */}

      <div
        className="
          absolute
          right-0
          top-60
          h-[350px]
          w-[350px]
          rounded-full
          bg-cyan-500/10
          blur-[120px]
        "
      />

      {/* Bottom Glow */}

      <div
        className="
          absolute
          bottom-0
          left-16
          h-[250px]
          w-[250px]
          rounded-full
          bg-blue-500/10
          blur-[120px]
        "
      />
    </div>
  );
}