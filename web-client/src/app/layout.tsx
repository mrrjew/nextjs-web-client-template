import { Poppins } from "next/font/google";
import SiteHeader from "@/app/(client-components)/(Header)/SiteHeader";
import Footer from "@/components/Footer";
// import ReactQueryClientProvider from "@/components/ReactQueryClientProvider";
import ReduxProvider from "@/store/providers";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import "./globals.css";
// import ReactQueryClientProvider from "@/components/ReactQueryClientProvider";
import LayoutWrapper from "./layoutWrapper";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "PaceDream - The best place to find your hotel",
  description: "The best place to find your hotel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.className}>
      {/* pt-[64px] */}
      <body className="bg-[#FFFFFF] text-base text-neutral-900 overflow-x-hidden max-w-screen flex flex-col">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
