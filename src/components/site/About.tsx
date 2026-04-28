import { motion } from "framer-motion";
import { Award, Users, Heart, ShieldCheck } from "lucide-react";

const stats = [
  { icon: Award, value: "4.7★", label: "Google rating" },
  { icon: Users, value: "74+", label: "Verified reviews" },
  { icon: Heart, value: "Pedo", label: "Specialist-led care" },
  { icon: ShieldCheck, value: "Safe", label: "Sedation & GA available" },
];

export const About = () => (
  <section className="relative py-24 sm:py-32 bg-background">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl"
      >
        <span className="section-eyebrow">About 32 Dentz</span>
        <h2 className="mt-4 text-3xl sm:text-5xl font-semibold tracking-tight text-balance text-ink">
          A clinic where kids actually look forward to the dentist.
        </h2>
        <p className="mt-6 text-lg text-muted-foreground text-balance">
          We blend gentle pediatric expertise with modern adult dentistry —
          laser tools, conscious sedation, and quiet, kid-friendly rooms — so
          every visit feels easy, safe, and a little bit fun.
        </p>
      </motion.div>

      <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-hairline rounded-2xl overflow-hidden border border-hairline">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-background p-8"
          >
            <s.icon className="h-5 w-5 text-foreground/60" />
            <div className="mt-6 text-3xl sm:text-4xl font-semibold tracking-tight text-ink">
              {s.value}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
