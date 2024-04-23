import Nav from "@/components/nav";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ClerkProvider
        {...pageProps}
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      >
        <Nav />
        <Component {...pageProps} />
      </ClerkProvider>
    </>
  );
}
