import { motion } from "framer-motion";
import {
  Sparkles, Stethoscope, Smile, Zap, Baby, Scissors,
  Activity, Syringe, Moon, Brain, AlignCenter, ScanLine,
} from "lucide-react";

export const services = [
  { icon: Baby, name: "Pediatric dentistry", desc: "Specialist care for infants, kids and teens." },
  { icon: Smile, name: "Teeth whitening", desc: "Brighten your smile safely in-clinic." },
  { icon: Stethoscope, name: "Check-ups & cleaning", desc: "Routine exams and professional cleaning." },
  { icon: Activity, name: "Root canals", desc: "RCT and pulpectomy with minimal discomfort." },
  { icon: Sparkles, name: "Cosmetic procedures", desc: "Reshaping, fillings and aesthetic care." },
  { icon: Zap, name: "Laser dentistry", desc: "Precise, minimally invasive treatments." },
  { icon: Moon, name: "Conscious sedation", desc: "Relaxed treatment for anxious patients." },
  { icon: Brain, name: "General anesthesia", desc: "For complex cases and special needs." },
  { icon: Scissors, name: "Oral surgery & extractions", desc: "Safe surgical procedures." },
  { icon: AlignCenter, name: "Mixed dentition orthodontics", desc: "Early orthodontic guidance for kids." },
  { icon: ScanLine, name: "Digital X-ray", desc: "Low-radiation, instant imaging." },
  { icon: Syringe, name: "Emergency care", desc: "Same-day appointments when it counts." },
];

export const Services = () => (
  <section id="services" className="relative py-24 sm:py-32 bg-steel-soft/40">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl"
      >
        <span className="section-eyebrow">Services</span>
        <h2 className="mt-4 text-3xl sm:text-5xl font-semibold tracking-tight text-ink text-balance">
          Everything your family's smile needs, under one roof.
        </h2>
      </motion.div>

      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (i % 6) * 0.06 }}
            whileHover={{ y: -4 }}
            className="group rounded-2xl border border-hairline bg-background p-6 shadow-soft hover:shadow-glow transition-all"
          >
            <div className="h-11 w-11 rounded-xl bg-steel/40 flex items-center justify-center group-hover:bg-ink group-hover:text-background transition-colors">
              <s.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-semibold text-ink">{s.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
