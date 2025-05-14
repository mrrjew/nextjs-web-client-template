"use client";

import ReactQueryClientProvider from "@/components/ReactQueryClientProvider";
import ReduxProvider from "@/store/providers";
import { usePathname } from "next/navigation";
import React from "react";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const [hideDefaultLayout, setHideDefaultLayoute] = React.useState(false);

  React.useEffect(() => {
    const isPathAddListing = path.split("/").includes("add-listing");
    setHideDefaultLayoute(isPathAddListing);
  }, [path]);

  return (
    <ReactQueryClientProvider>
      <ReduxProvider>
        {/* {!hideDefaultLayout && <SiteHeader />} */}
        <section
          className={`flex-1 ${hideDefaultLayout ? "mt-0" : "mt-[64px]"}`}
        >
          {children}
        </section>
        {/* {!hideDefaultLayout && <Footer />} */}
      </ReduxProvider>
    </ReactQueryClientProvider>
  );
}
