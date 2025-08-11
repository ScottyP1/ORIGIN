import { Outlet, useLocation } from "react-router-dom";
import Galaxy from "./components/Galaxy";
import NavBar from "./components/NavBar";
import TargetCursor from "./components/TargetCursor";
import frame from "./assets/frame.png";

export default function RootLayout() {
  const { pathname } = useLocation();
  const hideFrameOn = ["/", "/login", "/register"];
  const showFrame = !hideFrameOn.includes(pathname);

  return (
    <div className="relative min-h-[100svh] w-screen overflow-x-hidden bg-black">
      {/* Galaxy background always behind everything */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Galaxy
          className="absolute inset-0 w-full h-full"
          saturation={1}
          hueShift={190}
          twinkleIntensity={0}
        />
      </div>

      {/* Nav */}
      <div className="sticky top-0 z-30">
        <NavBar />
      </div>

      {/* Page content */}
      <main className="relative z-20 max-w-[1200px] 2xl:max-w-[1500px] mx-auto pt-24 pb-24">
        <div className="hidden md:block">
          <TargetCursor spinDuration={2} hideDefaultCursor />
        </div>
        <Outlet />
      </main>

      {/* HUD Frame */}
      {showFrame && (
        <img
          src={frame}
          alt="frame"
          className="hidden sm:block pointer-events-none select-none fixed inset-0 w-full h-full z-10"
        />
      )}
    </div>
  );
}
