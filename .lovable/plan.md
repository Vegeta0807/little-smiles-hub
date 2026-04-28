## 32 Dentz Dental Clinic — Website Plan

A modern, interactive single-page website with an Apple-inspired monochrome aesthetic, subtle 3D atmosphere, smooth Framer Motion interactions, online booking, and a friendly FAQ chatbot.

### Design language

- Palette: `#FFFFFF` background, `#353535` primary text/ink, `#C5D1D6` accent (cool steel)
- Typography: large, tight-tracked sans-serif headings (SF-Pro feel via Inter Tight / system stack), generous whitespace
- Style: oversized hero type, thin dividers, soft shadows, rounded-2xl cards, magnetic buttons, scroll-triggered fades and parallax
- Motion: Framer Motion for section reveals, hover micro-interactions, smooth scroll, sticky nav with blur

### Sections (single-page with anchor nav)

1. **Hero** — Clinic name "32 Dentz", tagline, "Book Appointment" + "Call Now" CTAs. Subtle 3D background scene (floating tooth-shaped geometry, gentle drift, lighting in steel/white) using Three.js + react-three-fiber.
2. **About** — Trust badges: 4.7★ rating, 74 reviews, pediatric specialty, years of care.
3. **Services** — Animated grid of all listed services (Teeth whitening, Cleaning, Root canals, Pediatric care, Sedation/GA treatment, Laser dentistry, Orthodontics, X-ray, etc.) with hover lift.
4. **Why 32 Dentz** — Pediatric focus, special-needs care, modern tech, gentle technique pulled from review highlights.
5. **Reviews** — Carousel of real review quotes from the listing.
6. **Book Appointment** — Full booking form (see below).
7. **Visit Us** — Address, hours ("Open · Closes 9 pm"), phone (098202 49661), embedded Google Map of Seawoods West, Sector 44A location.
8. **Footer** — Quick links, socials, copyright.

### Booking system

Form fields: name, phone, email, service (dropdown of clinic's services), preferred date, preferred time slot, notes, child patient toggle.

Flow:
- Validate with Zod (client + edge function)
- Save booking to `bookings` table in Lovable Cloud (Supabase)
- Send confirmation email to patient + notification email to clinic via Lovable's built-in email infrastructure
- Show success state with booking reference

### Friendly chatbot (FAQ + booking handoff)

Floating chat bubble bottom-right, opens a clean panel with markdown rendering. Powered by Lovable AI (default `google/gemini-3-flash-preview`) via a streaming edge function.

System prompt grounds it in clinic facts: services, address, hours, phone, pediatric specialty, sedation/GA options, rating. Tone: warm, reassuring, kid-friendly.

When the user shows booking intent, the bot replies with a short summary and a "Book appointment" button that scrolls to and pre-fills the booking form (e.g., service field). It does not collect bookings inside chat.

### 3D & motion details

- Hero canvas: low-poly tooth shapes + soft point lights, slow rotation, mouse-parallax. Pauses when off-screen and respects `prefers-reduced-motion`.
- Section transitions: fade + translate-y on scroll
- Service cards: 3D tilt on hover
- Sticky top nav: backdrop-blur appears after scroll

### Technical notes

- Stack: React + Vite + Tailwind + shadcn/ui (existing), Framer Motion, @react-three/fiber@^8.18 + @react-three/drei@^9.122 + three
- Lovable Cloud enabled for: `bookings` table with RLS (public insert allowed, select restricted), `chat` edge function (streaming, public), `send-transactional-email` for confirmations
- Email: Lovable Emails — requires setting up a sender domain (one-click dialog after approval); two templates: `booking-confirmation` (to patient) and `booking-notification` (to clinic)
- Chatbot: streaming SSE edge function calling Lovable AI Gateway with clinic context in system prompt; client renders markdown via react-markdown
- Accessibility: semantic HTML, focus rings, reduced-motion fallbacks, alt text
- Responsive: mobile-first, hamburger nav under md, hero 3D scene scales down on small screens

### Out of scope (can add later)

- Patient login / appointment history
- Online payments / deposits
- Admin dashboard for staff to view bookings (currently read in Cloud → Tables)
- Multi-language support
