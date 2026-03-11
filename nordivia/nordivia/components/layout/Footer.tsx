import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="container-max py-10 text-sm text-black/70">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="font-extrabold text-black">{SITE.name}</div>
            <div>{SITE.location} • Founded {SITE.founded}</div>
          </div>
          <div className="text-xs max-w-xl leading-relaxed">
            <div className="font-semibold text-black/80">Compliance notice</div>
            <div>
              This website is a demo implementation. Replace placeholders (logo, images, leaflets) with official assets,
              and integrate a payment gateway (Pix/Boleto/Card) in production. Ensure LGPD/PCI compliance and proper legal
              review for product claims and regional regulations.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
