export const Footer = () => (
  <footer className="border-t border-hairline bg-background py-12">
    <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-sm">
      <div>
        <div className="font-semibold text-ink">32 Dentz Dental Clinic</div>
        <div className="text-muted-foreground mt-1">
          Pediatric & family dentistry · Seawoods, Navi Mumbai
        </div>
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-muted-foreground">
        <a href="#services" className="hover:text-ink transition-colors">Services</a>
        <a href="#book" className="hover:text-ink transition-colors">Book</a>
        <a href="#visit" className="hover:text-ink transition-colors">Visit</a>
        <a href="tel:09820249661" className="hover:text-ink transition-colors">098202 49661</a>
      </div>
      <div className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} 32 Dentz. All rights reserved.
      </div>
    </div>
  </footer>
);
