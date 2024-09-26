"use client";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import Link from "next/link";

function HomePage() {
  return (
    <div>
      <Hero />
      <InfoBoxes />
      <Footer />
    </div>
  );
}

export default HomePage;
