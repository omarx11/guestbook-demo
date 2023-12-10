import "./globals.scss";
import { Recursive } from "next/font/google";
import Providers from "./components/Providers";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata = {
  title: "Guestbook demo",
  description:
    "A logging system that allows visitors to leave public comments.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${recursive.className} bg-neutral-950 text-white`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
