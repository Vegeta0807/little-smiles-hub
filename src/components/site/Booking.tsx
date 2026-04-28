import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { services } from "./Services";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(20),
  email: z.string().trim().email("Please enter a valid email").max(255),
  service: z.string().min(1, "Please pick a service"),
  preferred_date: z.string().min(1, "Pick a date"),
  preferred_time: z.string().min(1, "Pick a time"),
  notes: z.string().max(500).optional(),
  is_child_patient: z.boolean(),
});

const timeSlots = [
  "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM",
  "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM",
];

export const Booking = () => {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<{ ref: string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const raw = {
      name: String(fd.get("name") || ""),
      phone: String(fd.get("phone") || ""),
      email: String(fd.get("email") || ""),
      service: String(fd.get("service") || ""),
      preferred_date: String(fd.get("preferred_date") || ""),
      preferred_time: String(fd.get("preferred_time") || ""),
      notes: String(fd.get("notes") || ""),
      is_child_patient: fd.get("is_child_patient") === "on",
    };
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const fe: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        fe[i.path[0] as string] = i.message;
      });
      setErrors(fe);
      return;
    }
    setSubmitting(true);
    const payload = parsed.data as {
      name: string; phone: string; email: string; service: string;
      preferred_date: string; preferred_time: string; notes?: string; is_child_patient: boolean;
    };
    const { data, error } = await supabase
      .from("bookings")
      .insert([payload])
      .select("id")
      .single();
    setSubmitting(false);
    if (error || !data) {
      toast.error("Sorry, something went wrong. Please call us at 098202 49661.");
      return;
    }
    setDone({ ref: data.id.slice(0, 8).toUpperCase() });
  };

  if (done) {
    return (
      <section id="book" className="py-24 sm:py-32 bg-steel-soft/40">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-ink text-background mb-6"
          >
            <CheckCircle2 className="h-8 w-8" />
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink">
            Appointment requested.
          </h2>
          <p className="mt-4 text-muted-foreground">
            We've got your request. Our team will call you shortly to confirm
            the slot.
          </p>
          <p className="mt-6 text-sm">
            Reference:{" "}
            <span className="font-mono font-medium text-ink">{done.ref}</span>
          </p>
          <a
            href="tel:09820249661"
            className="mt-8 inline-flex items-center rounded-full border border-ink/20 px-5 py-2.5 text-sm hover:bg-background"
          >
            Call clinic: 098202 49661
          </a>
        </div>
      </section>
    );
  }

  return (
    <section id="book" className="py-24 sm:py-32 bg-steel-soft/40">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-eyebrow">Book appointment</span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-semibold tracking-tight text-ink max-w-2xl text-balance">
            Reserve your slot in under a minute.
          </h2>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          onSubmit={onSubmit}
          className="mt-12 grid sm:grid-cols-2 gap-5 rounded-3xl bg-background border border-hairline shadow-soft p-6 sm:p-10"
        >
          <Field label="Full name" error={errors.name}>
            <input name="name" required maxLength={100} className={inputCls} placeholder="Aarav Sharma" />
          </Field>
          <Field label="Phone" error={errors.phone}>
            <input name="phone" required maxLength={20} className={inputCls} placeholder="+91 98765 43210" />
          </Field>
          <Field label="Email" error={errors.email} className="sm:col-span-2">
            <input name="email" type="email" required maxLength={255} className={inputCls} placeholder="you@example.com" />
          </Field>
          <Field label="Service" error={errors.service}>
            <select name="service" required defaultValue="" className={inputCls}>
              <option value="" disabled>Select a service</option>
              {services.map((s) => (
                <option key={s.name} value={s.name}>{s.name}</option>
              ))}
              <option value="Other">Other / not sure</option>
            </select>
          </Field>
          <Field label="Preferred date" error={errors.preferred_date}>
            <input
              name="preferred_date"
              type="date"
              required
              min={new Date().toISOString().split("T")[0]}
              className={inputCls}
            />
          </Field>
          <Field label="Preferred time" error={errors.preferred_time} className="sm:col-span-2">
            <select name="preferred_time" required defaultValue="" className={inputCls}>
              <option value="" disabled>Pick a time slot</option>
              {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Notes (optional)" error={errors.notes} className="sm:col-span-2">
            <textarea name="notes" rows={3} maxLength={500} className={inputCls + " resize-none"}
              placeholder="Anything we should know? Allergies, anxiety, special needs…" />
          </Field>
          <label className="sm:col-span-2 flex items-center gap-3 text-sm text-foreground/80 select-none">
            <input name="is_child_patient" type="checkbox" className="h-4 w-4 rounded border-hairline" />
            This appointment is for a child
          </label>
          <button
            type="submit"
            disabled={submitting}
            className="sm:col-span-2 mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-ink text-background px-6 py-3.5 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {submitting ? "Submitting…" : "Request appointment"}
          </button>
          <p className="sm:col-span-2 text-xs text-muted-foreground text-center">
            We'll call you to confirm. For emergencies, call{" "}
            <a href="tel:09820249661" className="underline">098202 49661</a>.
          </p>
        </motion.form>
      </div>
    </section>
  );
};

const inputCls =
  "w-full rounded-xl border border-hairline bg-background px-4 py-3 text-sm text-ink placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ink/20 focus:border-ink/40 transition";

const Field = ({
  label, error, children, className = "",
}: { label: string; error?: string; children: React.ReactNode; className?: string }) => (
  <div className={className}>
    <label className="block text-xs font-medium text-foreground/70 mb-1.5">{label}</label>
    {children}
    {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
  </div>
);
