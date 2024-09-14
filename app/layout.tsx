import "./globals.scss";
import { Recursive } from "next/font/google";
import Providers from "./components/Providers";
import type { Metadata } from "next";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Guestbook demo",
  description:
    "A logging system that allows visitors to leave public comments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${recursive.className} flex min-h-screen justify-center overflow-x-hidden bg-black text-white antialiased`}
      >
        <main className="mt-8 flex w-full max-w-[1000px] flex-col items-center px-2 sm:px-0 md:mt-12">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
