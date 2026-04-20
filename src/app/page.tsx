import { Counter } from "@/components/Counter";
import { Devices } from "@/components/Devices";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Introduction } from "@/components/Introduction";
import { Navigation } from "@/components/Navigation";
import { Showcase } from "@/components/Showcase";
import { SignupBanner } from "@/components/SignupBanner";
import { Statement } from "@/components/Statement";

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Devices />
      <Introduction />
      <Showcase />
      <Statement />
      <Counter />
      <SignupBanner />
      <Footer />
    </main>
  );
}
