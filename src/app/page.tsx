import { ComparisonTable } from "@/components/ComparisonTable";
import { Counter } from "@/components/Counter";
import { Devices } from "@/components/Devices";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Introduction } from "@/components/Introduction";
import { Navigation } from "@/components/Navigation";
import { PainPoints } from "@/components/PainPoints";
import { Showcase } from "@/components/Showcase";
import { SignupBanner } from "@/components/SignupBanner";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Devices />
      <Introduction />
      <PainPoints />
      <Showcase />
      <Testimonials />
      <ComparisonTable />
      <Counter />
      <SignupBanner />
      <Footer />
    </main>
  );
}
