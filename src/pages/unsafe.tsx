import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/router"; // Import the useRouter hook
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
export default function UnSafePage() {
  const router = useRouter(); // Initialize the useRouter hook
  const { user } = useUser();
  const [birthda, setBirthda] = useState(new Date());

  const updateBirthday = async () => {
    const birthday = moment.utc(birthda).format("Do MMMM YYYY");
    try {
      await user.update({
        unsafeMetadata: {
          birthday,
        },
      });
      // Navigate to the home page after updating the birthday
      router.push("/");
    } catch (error) {
      console.error("Error updating birthday:", error);
      // Handle error if necessary
    }
  };
  console.log(user);
  return (
    <div className="flex justify-center items-center h-[100vh] bg-white">
      <div className="w-[60vh] flex flex-col items-center">
        <DatePicker
          className="text-[#02020A] mb-10"
          selected={birthda}
          onChange={(date) => setBirthda(date)}
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />

        <button
          className="bg-red-500 p-3 border-none outline-none rounded-xl cursor-pointer"
          onClick={updateBirthday} // Call the updateBirthday function on click
        >
          Update Birthday
        </button>
      </div>
    </div>
  );
}
