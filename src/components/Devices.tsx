import Image from "next/image";
import { LettersScatter } from "./LettersScatter";

type DeviceImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  style: React.CSSProperties;
};

const DEVICES: DeviceImage[] = [
  {
    src: "/images/devices/desktop.png",
    alt: "AICareer on Desktop",
    width: 970,
    height: 776,
    style: { top: "15px", left: "136px" },
  },
  {
    src: "/images/devices/tablet.png",
    alt: "AICareer on Tablet",
    width: 384,
    height: 584,
    style: {
      top: "305.945px",
      left: "0px",
      transform: "translateX(-50px) rotate(-20deg)",
    },
  },
  {
    src: "/images/devices/phone-android.png",
    alt: "AICareer on Android",
    width: 269,
    height: 568,
    style: {
      top: "275.43px",
      left: "870.406px",
      transform: "translateX(50px)",
    },
  },
  {
    src: "/images/devices/phone-ios.png",
    alt: "AICareer on iPhone",
    width: 230,
    height: 468,
    style: {
      top: "359.938px",
      left: "1049.6px",
      transform: "translateX(50px) rotate(10deg)",
    },
  },
];

export function Devices() {
  return (
    <section className="sticky top-0 h-[781px] w-full overflow-hidden">
      <LettersScatter className="pointer-events-none absolute inset-0 h-full w-full text-content-primary/20" />
      <div className="w-full px-6 md:px-20">
        <div className="mx-auto flex w-full max-w-[1312px] justify-center">
          <div className="relative hidden h-[781px] w-full max-w-[1280px] md:block">
            {DEVICES.map((d) => (
              <Image
                key={d.src}
                src={d.src}
                alt={d.alt}
                width={d.width}
                height={d.height}
                priority
                className="absolute"
                style={d.style}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
