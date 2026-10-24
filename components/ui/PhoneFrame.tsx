import type { ReactNode } from "react";

// The app is laid out in dp on a 411dp-wide Android screen. Screens are built
// at that size (1px = 1dp, values copied from the RN StyleSheets) and zoomed
// down to fit the 280×600 phone screen.
export const DP_WIDTH = 411;
export const DP_HEIGHT = 881;
const SCREEN_W = 280;

export function PhoneFrame({
  children,
  className = "",
  label = "Test4Test app screen",
}: {
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  // Exposed as a single image so screen readers and crawlers get a description
  // instead of the mock UI's strings ("9:41", "PRO+", …).
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative w-[300px] rounded-[46px] bg-phone p-[10px] shadow-[0_40px_80px_-30px_rgba(10,40,90,0.45),0_0_0_1px_rgba(255,255,255,0.06)_inset] ${className}`}
    >
      <span className="absolute -right-[3px] top-28 h-14 w-[3px] rounded-r bg-phone" />
      <span className="absolute -right-[3px] top-48 h-24 w-[3px] rounded-r bg-phone" />
      <div className="relative h-[600px] w-[280px] overflow-hidden rounded-[37px] bg-bg">
        <div
          aria-hidden
          className="rn relative flex flex-col overflow-hidden bg-bg text-ink"
          style={{ width: DP_WIDTH, height: DP_HEIGHT, zoom: SCREEN_W / DP_WIDTH }}
        >
          {children}
        </div>
        <span className="pointer-events-none absolute left-1/2 top-[7px] z-50 size-[11px] -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  );
}
