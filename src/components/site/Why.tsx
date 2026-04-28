import { motion } from "framer-motion";

const points = [
  {
    n: "01",
    title: "Pediatric specialists, not generalists",
    body: "Pedodontists trained specifically in childrens' dentistry — including treatment for kids with special health-care needs.",
  },
  {
    n: "02",
    title: "Modern, minimally invasive tech",
    body: "Laser dentistry, digital X-rays and gentle techniques mean less discomfort and faster recovery.",
  },
  {
    n: "03",
    title: "Sedation & GA when it helps",
    body: "Anxious patient or complex case? We offer treatment under conscious sedation and general anesthesia, safely.",
  },
  {
    n: "04",
    title: "Genuinely kind staff",
    body: "Reviews keep saying it: polite team, perfect technique, great hygiene. We take that seriously.",
  },
];

export const Why = () => (
  <section id="why" className="py-24 sm:py-32 bg-background">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <span className="section-eyebrow">Why 32 Dentz</span>
        <h2 className="mt-4 text-3xl sm:text-5xl font-semibold tracking-tight text-ink max-w-2xl text-balance">
          Built on trust, not pressure.
        </h2>
      </motion.div>

      <div className="mt-16 grid md:grid-cols-2 gap-px bg-hairline rounded-2xl overflow-hidden border border-hairline">
        {points.map((p, i) => (
          <motion.div
            key={p.n}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="bg-background p-8 sm:p-10"
          >
            <div className="text-xs font-mono text-muted-foreground">{p.n}</div>
            <h3 className="mt-4 text-xl sm:text-2xl font-semibold text-ink tracking-tight">
              {p.title}
            </h3>
            <p className="mt-3 text-muted-foreground">{p.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
