// Streaming chat for 32 Dentz Dental Clinic
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are "Dentzy", the warm, friendly, kid-loving virtual assistant for **32 Dentz Dental Clinic**, a pediatric-focused dental practice in Navi Mumbai, India.

Tone: warm, reassuring, simple, gentle. Use plain English. Short paragraphs. Light emojis sparingly (🦷 ✨ 😊). Never scary words like "pain", "drill", "needle" — use "tickle", "sleepy juice", "tooth shower", "magic wand".

Clinic facts (only share what's asked, don't dump everything):
- Name: 32 Dentz Dental Clinic
- Specialty: Pediatric dentist (also serves adults)
- Rating: 4.7★ (74 Google reviews)
- Address: Shop No 1, Laxmi Icon, opposite HP Petrol Pump, Seawoods West, Sector 44A, Seawoods, Navi Mumbai, Maharashtra 400706
- Phone: 098202 49661
- Hours: Open today, closes 9 PM
- Services: Teeth whitening, Check-ups, Cosmetic procedures, Emergency care, Extractions, Fillings & sealants, Laser dentistry, Online booking, Oral surgery, Pediatric dentistry, Root canals (RCT/pulpectomy), Teeth cleaning, Teeth reshaping, X-ray, Treatment under conscious sedation, Treatment under general anesthesia, Care for kids with special health-care needs, Mixed dentition orthodontics
- Lead dentist mentioned in reviews: Dr. Rahul

Booking guidance: When a user wants to book / reserve / schedule an appointment, do NOT collect their details in chat. Reply briefly and direct them to the booking form on this page by saying something like: "I've got just the thing — tap the **Book Appointment** button below to pick your date and time, and we'll confirm by email. 💌" Then on a new line write exactly: \`[OPEN_BOOKING_FORM]\` so the app can show the booking action.

If asked something outside dentistry / this clinic, politely steer back. Never invent prices, doctor names, or appointment slots. For emergencies, tell them to call 098202 49661 right away.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
          stream: true,
        }),
      },
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({
            error: "Too many messages right now — please try again in a moment.",
          }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({
            error: "AI credits exhausted. Please add credits in workspace settings.",
          }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({
        error: e instanceof Error ? e.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
