import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "Adipotide",
        slug: "adipotide-5mg",
        concentration: "5mg",
        brlPrice: 1200,
        image: "/products/scenes/adipotide-5mg.jpeg",
        leafletPath: "/leaflets/adipotide-5mg.pdf"
      },
      {
        name: "AOD-9604",
        slug: "aod-9604-5mg",
        concentration: "5mg",
        brlPrice: 1400,
        image: "/products/scenes/aod-9604-5mg.jpeg",
        leafletPath: "/leaflets/aod-9604-5mg.pdf"
      },
      {
        name: "CJC-1295 With DAC",
        slug: "cjc-1295-with-dac-5mg",
        concentration: "5mg",
        brlPrice: 2100,
        image: "/products/scenes/cjc-1295-with-dac-5mg.jpeg",
        leafletPath: "/leaflets/cjc-1295-with-dac-5mg.pdf"
      },
      {
        name: "CJC-1295 Without DAC",
        slug: "cjc-1295-without-dac-10mg",
        concentration: "10mg",
        brlPrice: 2000,
        image: "/products/scenes/cjc-1295-without-dac-10mg.jpeg",
        leafletPath: "/leaflets/cjc-1295-without-dac-10mg.pdf"
      },
      {
        name: "Follistatin",
        slug: "follistatin-1mg",
        concentration: "1mg",
        brlPrice: 2600,
        image: "/products/scenes/follistatin-1mg.jpeg",
        leafletPath: "/leaflets/follistatin-1mg.pdf"
      },
      {
        name: "GHK-CU",
        slug: "ghk-cu-100mg",
        concentration: "100mg",
        brlPrice: 1800,
        image: "/products/scenes/ghk-cu-100mg.jpeg",
        leafletPath: "/leaflets/ghk-cu-100mg.pdf"
      },
      {
        name: "GLOW",
        slug: "glow-70mg",
        concentration: "70mg",
        brlPrice: 1600,
        image: "/products/scenes/glow-70mg.jpeg",
        leafletPath: "/leaflets/glow-70mg.pdf"
      },
      {
        name: "HCG",
        slug: "hcg-10000ui",
        concentration: "10000UI",
        brlPrice: 1700,
        image: "/products/scenes/hcg-10000ui.jpeg",
        leafletPath: "/leaflets/hcg-10000ui.pdf"
      },
      {
        name: "HGH Fragment 176-191",
        slug: "hgh-fragment-176-191-5mg",
        concentration: "5mg",
        brlPrice: 2100,
        image: "/products/scenes/hgh-fragment-176-191-5mg.jpeg",
        leafletPath: "/leaflets/hgh-fragment-176-191-5mg.pdf"
      },
      {
        name: "Ipamorelin",
        slug: "ipamorelin-10mg",
        concentration: "10mg",
        brlPrice: 1900,
        image: "/products/scenes/ipamorelin-10mg.jpeg",
        leafletPath: "/leaflets/ipamorelin-10mg.pdf"
      },
      {
        name: "KLOW",
        slug: "klow-80mg",
        concentration: "80mg",
        brlPrice: 1500,
        image: "/products/scenes/klow-80mg.jpeg",
        leafletPath: "/leaflets/klow-80mg.pdf"
      },
      {
        name: "Lemon Bottle",
        slug: "lemon-bottle-10mg",
        concentration: "10mg",
        brlPrice: 1400,
        image: "/products/scenes/lemon-bottle-10mg.jpeg",
        leafletPath: "/leaflets/lemon-bottle-10mg.pdf"
      },
      {
        name: "MOTS-C",
        slug: "mots-c-40mg",
        concentration: "40mg",
        brlPrice: 2500,
        image: "/products/scenes/mots-c-40mg.jpeg",
        leafletPath: "/leaflets/mots-c-40mg.pdf"
      },
      {
        name: "Pinealon",
        slug: "pinealon-20mg",
        concentration: "20mg",
        brlPrice: 1500,
        image: "/products/scenes/pinealon-20mg.jpeg",
        leafletPath: "/leaflets/pinealon-20mg.pdf"
      },
      {
        name: "PT-141",
        slug: "pt-141-10mg",
        concentration: "10mg",
        brlPrice: 1800,
        image: "/products/scenes/pt-141-10mg.jpeg",
        leafletPath: "/leaflets/pt-141-10mg.pdf"
      },
      {
        name: "Retatrutide",
        slug: "retatrutide-60mg",
        concentration: "60mg",
        brlPrice: 2800,
        image: "/products/scenes/retatrutide-60mg.jpeg",
        leafletPath: "/leaflets/retatrutide-60mg.pdf"
      },
      {
        name: "SLU-PP-332",
        slug: "slu-pp-332-5mg",
        concentration: "5mg",
        brlPrice: 2000,
        image: "/products/scenes/slu-pp-332-5mg.jpeg",
        leafletPath: "/leaflets/slu-pp-332-5mg.pdf"
      },
      {
        name: "SS-31",
        slug: "ss-31-10mg",
        concentration: "10mg",
        brlPrice: 1700,
        image: "/products/scenes/ss-31-10mg.jpeg",
        leafletPath: "/leaflets/ss-31-10mg.pdf"
      },
      {
        name: "Tesamorelin",
        slug: "tesamorelin-10mg",
        concentration: "10mg",
        brlPrice: 2300,
        image: "/products/scenes/tesamorelin-10mg.jpeg",
        leafletPath: "/leaflets/tesamorelin-10mg.pdf"
      },
      {
        name: "Thymosin Alpha-1",
        slug: "thymosin-alpha1-10mg",
        concentration: "10mg",
        brlPrice: 2000,
        image: "/products/scenes/thymosin-alpha1-10mg.jpeg",
        leafletPath: "/leaflets/thymosin-alpha1-10mg.pdf"
      },
      {
        name: "Tirzepatide",
        slug: "tirzepatide-60mg",
        concentration: "60mg",
        brlPrice: 3000,
        image: "/products/scenes/tirzepatide-60mg.jpeg",
        leafletPath: "/leaflets/tirzepatide-60mg.pdf"
      }
    ]
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });