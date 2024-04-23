import { SignIn, SignedOut, SignUpButton, SignInButton } from "@clerk/nextjs";

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function Example() {
  return (
    <div className="flex justify-center items-center h-full ">
      <SignIn routing="hash">
        <SignUpButton />
      </SignIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </div>
  );
}
