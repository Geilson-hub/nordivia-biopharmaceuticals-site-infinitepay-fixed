import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "Adipotide 5mg",
        slug: "adipotide-5mg",
        description: "Peptídeo sintético para pesquisa científica.",
        price: 1200,
        image: "/products/adipotide-5mg.svg"
      },
      {
        name: "Ipamorelin 10mg",
        slug: "ipamorelin-10mg",
        description: "Alta pureza, uso exclusivo laboratorial.",
        price: 1850,
        image: "/products/ipamorelin-10mg.svg"
      },
      {
        name: "Tirzepatide 60mg",
        slug: "tirzepatide-60mg",
        description: "Formulação avançada com controle QA/QC.",
        price: 2300,
        image: "/products/tirzepatide-60mg.svg"
      }
    ]
  })
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
