import Image from "next/image";
import { withBase } from "@/lib/basePath";
import { LettersScatter } from "./LettersScatter";

export function Devices() {
  return (
    <section className="sticky top-0 h-[781px] w-full overflow-hidden">
      <LettersScatter className="pointer-events-none absolute inset-0 h-full w-full text-content-primary/20" />
      <div className="w-full px-6 md:px-20">
        <div className="mx-auto flex w-full max-w-[1312px] justify-center">
          <div className="relative hidden h-[781px] w-full max-w-[1280px] items-start justify-center pt-[15px] md:flex">
            <Image
              src={withBase("/images/devices/desktop.png")}
              alt="AICareer on Desktop"
              width={1167}
              height={788}
              priority
              className="h-auto w-[1167px] max-w-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
