import { motion } from "framer-motion";
import { MapPin, Phone, Clock } from "lucide-react";

export const Visit = () => (
  <section id="visit" className="py-24 sm:py-32 bg-background">
    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <span className="section-eyebrow">Visit us</span>
        <h2 className="mt-4 text-3xl sm:text-5xl font-semibold tracking-tight text-ink text-balance">
          Right opposite HP Petrol Pump, Seawoods.
        </h2>

        <div className="mt-10 space-y-6">
          <Row icon={MapPin} title="Address">
            Shop No 1, Laxmi Icon, opposite HP Petrol Pump,<br />
            Seawoods West, Sector 44A, Seawoods,<br />
            Navi Mumbai, Maharashtra 400706
          </Row>
          <Row icon={Phone} title="Call">
            <a href="tel:09820249661" className="hover:text-ink transition-colors">
              098202 49661
            </a>
          </Row>
          <Row icon={Clock} title="Hours">
            Open today · closes 9:00 PM
          </Row>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="https://www.google.com/maps/search/?api=1&query=32+Dentz+Dental+Clinic+Seawoods+Navi+Mumbai"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-ink text-background px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Get directions
          </a>
          <a
            href="#book"
            className="inline-flex items-center rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium text-ink hover:bg-steel-soft transition-colors"
          >
            Book appointment
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="rounded-3xl overflow-hidden border border-hairline shadow-soft aspect-[4/5] sm:aspect-[5/4] lg:aspect-square"
      >
        <iframe
          title="32 Dentz location map"
          src="https://www.google.com/maps?q=32+Dentz+Dental+Clinic+Seawoods+West+Navi+Mumbai&output=embed"
          width="100%" height="100%" loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="border-0 grayscale-[20%]"
        />
      </motion.div>
    </div>
  </section>
);

const Row = ({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) => (
  <div className="flex gap-4">
    <div className="h-10 w-10 shrink-0 rounded-xl bg-steel-soft flex items-center justify-center">
      <Icon className="h-4 w-4 text-ink" />
    </div>
    <div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{title}</div>
      <div className="mt-1 text-foreground">{children}</div>
    </div>
  </div>
);
