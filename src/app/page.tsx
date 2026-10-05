import { Header } from "@/components/sections/Header";
import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
      </main>
    </>
  );
}
