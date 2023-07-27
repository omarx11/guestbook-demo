import "./globals.scss";
import { Recursive } from "next/font/google";
import Providers from "./components/Providers";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata = {
  title: "Guestbook demo App",
  description:
    "logging system that allows visitors of a website to leave a public comment.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={recursive.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
