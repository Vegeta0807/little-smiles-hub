import { useEffect } from "react";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Why } from "@/components/site/Why";
import { Reviews } from "@/components/site/Reviews";
import { Booking } from "@/components/site/Booking";
import { Visit } from "@/components/site/Visit";
import { Footer } from "@/components/site/Footer";
import { Chatbot } from "@/components/site/Chatbot";

const Index = () => {
  useEffect(() => {
    document.title = "32 Dentz Dental Clinic — Pediatric & Family Dentistry, Navi Mumbai";
    const meta = document.querySelector('meta[name="description"]') ||
      Object.assign(document.createElement("meta"), { name: "description" });
    meta.setAttribute(
      "content",
      "32 Dentz Dental Clinic in Seawoods, Navi Mumbai — pediatric specialists, laser dentistry, sedation & general anesthesia. 4.7★ on Google. Book online."
    );
    if (!meta.parentElement) document.head.appendChild(meta);
  }, []);

  return (
    <main className="bg-background text-foreground">
      <Nav />
      <Hero />
      <About />
      <Services />
      <Why />
      <Reviews />
      <Booking />
      <Visit />
      <Footer />
      <Chatbot />
    </main>
  );
};

export default Index;
