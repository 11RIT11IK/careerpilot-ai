export default function GridBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.04]"
    >
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]"
      />
    </div>
  );
}