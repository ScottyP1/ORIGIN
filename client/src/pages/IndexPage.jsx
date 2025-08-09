import IndexHub from "../components/IndexHub";

export default function IndexPage() {
  return (
    <div className="flex flex-col justify-center gap-12 items-center text-center animate-fade-in">
      <h1 className="text-xl text-gray-300 font-[Mokoto] tracking-[3px]">
        YOUR GITHUB ACTIVITY, DECODED IN REAL-TIME
      </h1>

      <IndexHub />

      <h2 className="text-xl text-gray-300 font-[Mokoto] tracking-[3px]">
        EVERY COMMIT. EVERY PULL. EVERY REVIEW.
        <br />
        TRACKED. LOGGED. DELIVERED INSTANTLY – EVEN WHEN YOU'RE OFF THE GRID.
      </h2>
    </div>
  );
}
