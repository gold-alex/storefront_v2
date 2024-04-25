import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Nav from "../components/nav";
import "../styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    // Update pathname state when route changes
    const handleRouteChange = (url) => {
      setPathname(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    // Set initial pathname
    setPathname(router.pathname);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  return (
    <>
      <ClerkProvider
        {...pageProps}
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      >
        {/* Pass the pathname as a prop to the Nav component */}
        <Nav pathname={pathname} />
        {/* Conditionally apply blur class based on pathname */}
        <div>
          <div>
            <Component {...pageProps} />
          </div>
        </div>
      </ClerkProvider>
    </>
  );
}
