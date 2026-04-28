import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    quote:
      "Dental cleaning and RC was extremely impressive — I'm thrilled with the service I received.",
    author: "Verified Google review",
  },
  {
    quote:
      "The doctor has excellent skills and uses a perfect technique. Truly gentle and reassuring.",
    author: "Verified Google review",
  },
  {
    quote:
      "Good hygiene, polite staff, and proper treatment provided by Dr. Rahul. Highly recommend.",
    author: "Verified Google review",
  },
];

export const Reviews = () => (
  <section id="reviews" className="py-24 sm:py-32 bg-ink text-background">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-background/60 font-medium">
          Reviews
        </span>
        <div className="mt-4 flex items-end gap-4">
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight max-w-2xl text-balance">
            What patients say.
          </h2>
          <div className="flex items-center gap-1 pb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-background text-background" />
            ))}
            <span className="ml-2 text-sm text-background/70">4.7 · 74 reviews</span>
          </div>
        </div>
      </motion.div>

      <div className="mt-16 grid md:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="rounded-2xl border border-background/10 bg-background/[0.04] p-8 backdrop-blur"
          >
            <div className="flex gap-0.5 mb-4">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="h-3.5 w-3.5 fill-background/80 text-background/80" />
              ))}
            </div>
            <blockquote className="text-lg leading-relaxed text-balance">
              "{r.quote}"
            </blockquote>
            <figcaption className="mt-6 text-xs text-background/50">
              — {r.author}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  </section>
);
