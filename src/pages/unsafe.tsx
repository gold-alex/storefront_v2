import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function UnSafePage() {
  const { user } = useUser();
  const [birthday, setBirthday] = useState(new Date());

  return (
    <div className="flex justify-center items-center h-[100vh] bg-white">
      <div className="w-[60vh] flex flex-col items-center">
        <DatePicker
          className="text-[#02020A] mb-10"
          selected={birthday}
          onChange={(date) => setBirthday(date)}
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />

        <button
          className="bg-red-500 p-3 border-none
           outline-none rounded-xl cursor-pointer"
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
    </div>
  );
}
