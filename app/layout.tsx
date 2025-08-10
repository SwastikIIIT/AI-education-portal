import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";

 export const dynamic = 'force-dynamic'

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Intelli Learn",
  description: "Real-time AI Teaching Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        {/* <body className={`${bricolage.variable} antialiased bg-[url('/images/bg1.jpg')] bg-cover bg-center bg-fixed bg-no-repeat relative`}> */}
       <body className={`${bricolage.variable} antialiased bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative relative bg-no-repeat bg-fixed bg-cover`} style={{
  backgroundImage: `radial-gradient(at 40% 20%, rgba(59, 130, 246, 0.1) 0px, transparent 50%),
                    radial-gradient(at 80% 0%, rgba(168, 85, 247, 0.1) 0px, transparent 50%),
                    radial-gradient(at 0% 50%, rgba(14, 165, 233, 0.1) 0px, transparent 50%)`
}}>
{/* <body className={`${bricolage.variable} antialiased bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 bg-fixed relative`}> */}

          <ClerkProvider appearance={{variables:{colorPrimary:"#f35933"}}}>
              <Navbar/>
              {children}
          </ClerkProvider>
         </body>
    </html>
  );
}