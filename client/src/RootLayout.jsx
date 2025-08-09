import { useContext } from "react";

import { Outlet } from "react-router-dom";
import Galaxy from "./components/Galaxy";
import Particles from "./components/Particles";

import frame from "./assets/frame.png";
import frame2 from "./assets/frame2.png";
import NavBar from "./components/NavBar";
import TargetCursor from "./components/TargetCursor";

export default function RootLayout() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      {/* Galaxy background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Galaxy
          className="absolute inset-0 w-full h-full"
          saturation={1}
          hueShift={190}
          twinkleIntensity={0}
        />
      </div>

      {/* Navigation pinned at top */}
      <div className="absolute z-20 top-0 left-0">
        <NavBar />
      </div>

      {/* Scrollable content below nav */}
      <div className="relative z-10 max-w-[1200px] 2xl:max-w-[1500px] mx-auto pt-32">
        <div className="hidden md:block">
          <TargetCursor spinDuration={2} hideDefaultCursor={true} />
        </div>
        <Outlet />
      </div>

      {/* HUD Frame */}
      <img
        src={frame}
        alt="frame"
        className="hidden sm:block absolute inset-0 w-full h-full pointer-events-none select-none"
      />
    </div>
  );
}
