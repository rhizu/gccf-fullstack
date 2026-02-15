import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NavbarWrapper from "@/components/NavbarWrapper";
import { Providers } from "./providers";

export const metadata = {
  title: "GCCF",
  description: "GCCF Official Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <NavbarWrapper />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}