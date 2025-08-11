import IndexImg from "../assets/indexImg.png";

export default function IndexPage() {
  return (
    <div className="flex flex-col justify-center gap-32 md:gap-0 items-center text-center animate-fade-in">
      <h1 className="text-xl md:text-2xl text-gray-400 font-[Mokoto] tracking-[3px]">
        YOUR GITHUB ACTIVITY, DECODED IN REAL-TIME
      </h1>
      <img src={IndexImg} className="w-2xl md:w-4xl 2xl:w-6xl" />
      <h2 className="text-xl md:text-2xl text-gray-400 font-[Mokoto] tracking-[3px]">
        EVERY COMMIT. EVERY PULL. EVERY REVIEW.
        <br />
        TRACKED. LOGGED. DELIVERED INSTANTLY – EVEN WHEN YOU'RE OFF THE GRID.
      </h2>
    </div>
  );
}
