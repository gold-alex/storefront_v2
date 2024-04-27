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
    <div className="relative h-screen flex justify-center items-center">
      {/* Container for the blurred background */}
      <div className="absolute inset-0 blur-md bg-white left-0 right-0"></div>

      {/* Container for the SignIn component */}
      <div className="relative" ref={containerRef}>
        <div className="absolute inset-0 flex justify-center items-center">
          <div>
            <SignIn routing="hash">
              <SignUpButton />
            </SignIn>
            <SignedOut>
              <SignInButton />
            </SignedOut>
          </div>
        </div>
      </div>
    </div>
  );
}
