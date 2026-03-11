import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "Adipotide 5mg",
        slug: "adipotide-5mg",
        concentration: "5mg",
        brlPrice: 1200,
        image: "/products/scenes/adipotide-5mg.jpeg",
        leafletPath: "/leaflets/adipotide-5mg.pdf"
      },
      {
        name: "Ipamorelin 10mg",
        slug: "ipamorelin-10mg",
        concentration: "10mg",
        brlPrice: 1850,
        image: "/products/scenes/ipamorelin-10mg.jpeg",
        leafletPath: "/leaflets/ipamorelin-10mg.pdf"
      },
      {
        name: "Tirzepatide 60mg",
        slug: "tirzepatide-60mg",
        concentration: "60mg",
        brlPrice: 2300,
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