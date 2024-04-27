import { useUser } from "@clerk/nextjs";
import { useState } from "react";

export default function UnSafePage() {
  const { user } = useUser();
  const [birthday, setBirthday] = useState("");
  console.log(user);

  return (
    <div>
      <input
        className="text-green-800"
        type="text"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
      />
      <button
        onClick={() => {
          user.update({
            unsafeMetadata: {
              birthday,
            },
          });
        }}
      >
        Update Birthday
      </button>
    </div>
  );
}
