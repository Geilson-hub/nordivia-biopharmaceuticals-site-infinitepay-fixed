import "./globals.css";

export const metadata = {
  title: "Nordivia Biopharmaceuticals",
  description: "Premium commercial site — PT-BR / EN-CA",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
