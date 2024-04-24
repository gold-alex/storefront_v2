import { useEffect } from "react";
import { useRouter } from "next/router";
import { SignIn, SignedOut, SignUpButton, SignInButton } from "@clerk/nextjs";

export default function Example() {
  const router = useRouter();

  const handleClick = () => {
    // If the current pathname is /login, replace it with /
    if (router.pathname === "/login") {
      router.push("/");
    }
  };

  useEffect(() => {
    // Add event listener to listen for clicks on the component
    const handleClickOutside = () => {
      handleClick();
    };

    // Attach event listener
    document.addEventListener("click", handleClickOutside);

    // Detach event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [router]);

  return (
    <div className="relative h-full">
      {/* Container for the blurred background */}
      <div className="absolute inset-0 blur-md bg-white"></div>

      {/* Container for the SignIn component */}
      <div className="flex justify-center items-center h-full">
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
