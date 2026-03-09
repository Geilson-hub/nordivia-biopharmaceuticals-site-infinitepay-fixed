// app/[locale]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { AppLocale } from "@/i18n/locales";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isPT = params.locale === "pt-br";

  const title = isPT
    ? "Nordivia Biopharmaceuticals | Ciência que eleva padrões"
    : "Nordivia Biopharmaceuticals | Science that elevates standards";

  const description = isPT
    ? "Empresa focada em pesquisa aplicada, processos robustos e fabricação com rastreabilidade e controle de qualidade."
    : "Company focused on applied research, robust processes and manufacturing with traceability and quality control.";

  return {
    title,
    description,
    metadataBase: new URL("https://seudominio.com"),
    alternates: {
      canonical: `/${params.locale}`,
      languages: {
        "pt-BR": "/pt-br",
        "en-CA": "/en-ca",
      },
    },
    openGraph: {
      title,
      description,
      url: `/${params.locale}`,
      siteName: "Nordivia Biopharmaceuticals",
      images: [
        {
          url: "/hero/hero.jpg",
          width: 1200,
          height: 630,
          alt: "Nordivia Biopharmaceuticals",
        },
      ],
      locale: isPT ? "pt_BR" : "en_CA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/hero/hero.jpg"],
    },
  };
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur">
      {children}
    </span>
  );
}

function SoftCard({
  title,
  text,
  icon,
}: {
  title: string;
  text: string;
  icon: string;
}) {
  return (
    <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-black/10 bg-black/5 text-lg">
          {icon}
        </div>
        <div>
          <h3 className="text-base md:text-lg font-extrabold text-black">{title}</h3>
          <p className="mt-2 text-sm text-black/70 leading-relaxed">{text}</p>
        </div>
      </div>
    </div>
  );
}

function SplitRow({
  title,
  text,
  imageSrc,
  reverse,
  chips,
}: {
  title: string;
  text: string;
  imageSrc: string;
  reverse?: boolean;
  chips: string[];
}) {
  return (
    <div className="grid items-center gap-6 md:gap-10 lg:grid-cols-2">
      <div className={reverse ? "lg:order-2" : ""}>
        <div className="rounded-3xl border border-black/10 bg-white p-6 md:p-8 shadow-sm">
          <h3 className="text-xl md:text-2xl font-extrabold text-black">{title}</h3>
          <p className="mt-3 text-sm md:text-base text-black/70 leading-relaxed">{text}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {chips.map((c) => (
              <span
                key={c}
                className="rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs font-semibold text-black/70"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={reverse ? "lg:order-1" : ""}>
        <div className="rounded-3xl overflow-hidden border border-black/10 bg-white shadow-sm">
          <div className="relative h-[260px] md:h-[340px] lg:h-[380px]">
            <Image src={imageSrc} alt={title} fill className="object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}

function LogoTile({ src }: { src: string }) {
  return (
    <div className="group relative rounded-2xl border border-white/10 bg-white/10 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-blue-400/30">
      <div className="absolute inset-0 rounded-2xl bg-blue-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 blur-xl" />
      <div className="relative h-8 transition-transform duration-300 group-hover:scale-105">
        <Image src={src} alt="Partner" fill className="object-contain" />
      </div>
    </div>
  );
}

export default async function HomePage({
  params,
}: {
  params: { locale: AppLocale };
}) {
  const locale = params.locale;
  const tHome = await getTranslations({ locale, namespace: "home" });

  const chips = [
    tHome("chips.chip1"),
    tHome("chips.chip2"),
    tHome("chips.chip3"),
  ];

  return (
    <main className="min-h-screen bg-[#f7f8fb]">
      {/* HERO */}
      <section className="relative">
        <div className="relative h-[600px] md:h-[700px]">
          <Image src="/hero/hero.jpg" alt="Nordivia" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.35),transparent_55%)]" />

          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto max-w-7xl px-4 w-full relative">
              <div className="max-w-2xl">
                <div className="flex flex-wrap gap-2">
                  <Pill>{tHome("heroPills.pill1")}</Pill>
                  <Pill>{tHome("heroPills.pill2")}</Pill>
                  <Pill>{tHome("heroPills.pill3")}</Pill>
                </div>

                <h1 className="mt-5 text-white text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
                  {tHome("heroTitle")}
                </h1>

                <p className="mt-4 text-white/85 text-sm md:text-base leading-relaxed max-w-xl">
                  {tHome("heroSubtitle")}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href={`/${locale}/products`}
                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-extrabold text-white shadow-sm hover:bg-blue-700 transition"
                  >
                    {tHome("ctaProducts")}
                  </Link>
                  
                  <Link
                    href={`/${locale}/register`}
                    className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-extrabold text-black shadow-sm hover:bg-white/90 transition"
                  >
                    {tHome("ctaAccount")}
                  </Link>
                </div>

                <div className="mt-10 grid grid-cols-3 gap-3 max-w-xl">
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                    <div className="text-white text-xl font-extrabold">{tHome("metrics.m1Title")}</div>
                    <div className="text-white/75 text-xs">{tHome("metrics.m1Body")}</div>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                    <div className="text-white text-xl font-extrabold">{tHome("metrics.m2Title")}</div>
                    <div className="text-white/75 text-xs">{tHome("metrics.m2Body")}</div>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                    <div className="text-white text-xl font-extrabold">{tHome("metrics.m3Title")}</div>
                    <div className="text-white/75 text-xs">{tHome("metrics.m3Body")}</div>
                  </div>
                </div>
              </div>

              {/* Card compromissos */}
              <div className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 w-[420px]">
                <div className="rounded-3xl border border-white/15 bg-white/10 backdrop-blur p-6 shadow-lg">
                  <div className="text-white font-extrabold text-lg">{tHome("commitments.title")}</div>
                  <ul className="mt-3 space-y-2 text-sm text-white/80">
                    <li>• {tHome("commitments.item1")}</li>
                    <li>• {tHome("commitments.item2")}</li>
                    <li>• {tHome("commitments.item3")}</li>
                    <li>• {tHome("commitments.item4")}</li>
                  </ul>
                  <div className="mt-5">
                    <Link
                      href={`/${locale}#about`}
                      className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-extrabold text-black hover:bg-white/90 transition"
                    >
                      {tHome("commitments.cta")}
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="relative -mt-10">
          <div className="mx-auto max-w-7xl px-4">
            <div className="rounded-3xl bg-[#f7f8fb] p-6 md:p-10 shadow-[0_-10px_40px_rgba(0,0,0,0.10)] border border-black/5" />
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="mx-auto max-w-7xl px-4 -mt-6">
        <div className="rounded-3xl border border-black/10 bg-white px-6 py-6 md:px-10 md:py-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <div className="text-sm font-extrabold text-black">{tHome("trust.title")}</div>
              <div className="mt-1 text-sm text-black/70">{tHome("trust.subtitle")}</div>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs font-semibold text-black/70">
                {tHome("trust.tag1")}
              </span>
              <span className="rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs font-semibold text-black/70">
                {tHome("trust.tag2")}
              </span>
              <span className="rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs font-semibold text-black/70">
                {tHome("trust.tag3")}
              </span>
              <span className="rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs font-semibold text-black/70">
                {tHome("trust.tag4")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-7xl px-4 pt-12 pb-20">
        <div className="mb-8">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-black">{tHome("aboutTitle")}</h2>
          <p className="mt-3 text-sm md:text-base text-black/70 max-w-2xl">{tHome("aboutSubtitle")}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <SoftCard icon="🧪" title={tHome("softCards.c1Title")} text={tHome("softCards.c1Body")} />
          <SoftCard icon="📈" title={tHome("softCards.c2Title")} text={tHome("softCards.c2Body")} />
          <SoftCard icon="⚙️" title={tHome("softCards.c3Title")} text={tHome("softCards.c3Body")} />
          <SoftCard icon="🛡️" title={tHome("softCards.c4Title")} text={tHome("softCards.c4Body")} />
        </div>

        <div className="mt-10 space-y-10">
          <SplitRow title={tHome("sinceTitle")} text={tHome("sinceBody")} imageSrc="/home/lab-1.jpg" chips={chips} />
          <SplitRow reverse title={tHome("rndTitle")} text={tHome("rndBody")} imageSrc="/home/lab-2.jpg" chips={chips} />
          <SplitRow title={tHome("automationTitle")} text={tHome("automationBody")} imageSrc="/home/factory-1.jpg" chips={chips} />
          <SplitRow reverse title={tHome("scaleTitle")} text={tHome("scaleBody")} imageSrc="/home/factory-2.jpg" chips={chips} />
        </div>

        {/* CTA intermediário */}
        <div className="mt-12 rounded-3xl border border-black/10 bg-white p-6 md:p-8 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="text-lg font-extrabold text-black">{tHome("midCta.title")}</div>
            <div className="mt-1 text-sm text-black/70">{tHome("midCta.subtitle")}</div>
          </div>
          <div className="flex gap-3">
            <Link
              href={`/${locale}/products`}
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white hover:bg-blue-700 transition"
            >
              {tHome("midCta.primary")}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center rounded-xl bg-black/5 px-5 py-3 text-sm font-extrabold text-black border border-black/10 hover:bg-black/10 transition"
            >
              {tHome("midCta.secondary")}
            </Link>
          </div>
        </div>

        {/* PARTNERS */}
        <div className="mt-14 rounded-3xl overflow-hidden border border-black/10 bg-gradient-to-r from-[#0b1b35] via-[#10284f] to-[#0b1b35]">
          <div className="px-6 py-10 md:px-10 md:py-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h3 className="text-white text-2xl font-extrabold">{tHome("partnersTitle")}</h3>
                <p className="mt-2 text-white/75 text-sm md:text-base max-w-2xl">
                  {tHome("partnersBody")}
                </p>
              </div>

              <div className="flex gap-3">
                <Link
                  href={`/${locale}/products`}
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white hover:bg-blue-700 transition"
                >
                  {tHome("partnersCtaProducts")}
                </Link>
                <Link
                  href={`/${locale}/register`}
                  className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-black hover:bg-white/90 transition"
                >
                  {tHome("partnersCtaAccount")}
                </Link>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 items-center">
              <LogoTile src="/brands/brand-1.png" />
              <LogoTile src="/brands/brand-2.png" />
              <LogoTile src="/brands/brand-3.png" />
              <LogoTile src="/brands/brand-4.png" />
              <LogoTile src="/brands/brand-5.png" />
            </div>
          </div>

          <div className="border-t border-white/10 px-6 py-4 md:px-10 text-white/70 text-xs md:text-sm flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>© {new Date().getFullYear()} Nordivia Biopharmaceuticals</div>
            <div className="flex gap-4">
              <span>{tHome("partnersFooter.email")}</span>
              <span>{tHome("partnersFooter.phone")}</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
