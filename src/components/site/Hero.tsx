import { motion } from "framer-motion";
import { Star, ArrowRight, Phone } from "lucide-react";
import { HeroScene } from "./HeroScene";

export const Hero = () => (
  <section id="top" className="relative min-h-[100svh] flex items-center overflow-hidden">
    <HeroScene />

    <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="inline-flex items-center gap-2 rounded-full border border-hairline bg-background/60 backdrop-blur px-3 py-1 text-xs text-foreground/80"
      >
        <Star className="h-3.5 w-3.5 fill-ink text-ink" />
        <span className="font-medium">4.7</span>
        <span className="text-muted-foreground">·  74 Google reviews</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="display-text mt-6 text-balance text-ink"
      >
        Gentle, modern dentistry.
        <br />
        <span className="text-foreground/50">Built around kids.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25 }}
        className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground text-balance"
      >
        32 Dentz is a pediatric-led dental clinic in Seawoods, Navi Mumbai —
        offering everything from teeth cleaning and laser dentistry to treatment
        under sedation and care for kids with special health needs.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-10 flex flex-wrap items-center gap-3"
      >
        <a
          href="#book"
          className="group inline-flex items-center gap-2 rounded-full bg-ink text-primary-foreground px-6 py-3 text-sm font-medium hover:opacity-90 transition-all hover:gap-3"
        >
          Book appointment
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
        <a
          href="tel:09820249661"
          className="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-background/70 backdrop-blur px-6 py-3 text-sm font-medium text-ink hover:bg-background transition-colors"
        >
          <Phone className="h-4 w-4" />
          098202 49661
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="mt-16 flex items-center gap-6 text-xs text-muted-foreground"
      >
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Open today · closes 9 PM
        </div>
        <div className="hidden sm:block">Seawoods West, Navi Mumbai</div>
      </motion.div>
    </div>
  </section>
);
