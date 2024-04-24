import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { SignIn, SignedOut, SignUpButton, SignInButton } from "@clerk/nextjs";

export default function Example() {
  const router = useRouter();
  const containerRef = useRef(null);

  const handleClick = (event) => {
    // Check if the click happened outside the container
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      // If the current pathname is /login, replace it with /
      if (router.pathname === "/login") {
        router.push("/");
      }
    }
  };

  useEffect(() => {
    // Add event listener to listen for clicks outside the container
    document.addEventListener("click", handleClick);

    // Detach event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [router]);

  return (
    <div className="relative h-full">
      {/* Container for the blurred background */}
      <div className="absolute inset-0 blur-md bg-white"></div>

      {/* Container for the SignIn component */}
      <div
        ref={containerRef}
        className="flex justify-center items-center h-full"
      >
        <SignIn routing="hash">
          <SignUpButton />
        </SignIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </div>
  );
}
