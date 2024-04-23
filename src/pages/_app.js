import Nav from "@/components/nav";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ClerkProvider {...pageProps}>
        <Nav />
        <Component {...pageProps} />
      </ClerkProvider>
    </>
  );
}
